const vnpayService = require('../services/vnpay.service');

exports.createVNPayPayment = (req, res) => {
  try {
    const { amount } = req.body;
    
    // Validate
    if(!amount) return res.status(400).json({message: "Thiếu số tiền"});

    const orderId = Date.now().toString(); // Nên lưu orderId này vào Database của bạn với trạng thái 'PENDING'

    // Lấy IP thật (quan trọng khi lên production)
    const ipAddr = req.headers['x-forwarded-for'] || 
                   req.connection.remoteAddress || 
                   req.socket.remoteAddress || 
                   req.connection.socket.remoteAddress;

    const paymentUrl = vnpayService.createVNPayUrl({
      amount,
      orderId,
      ipAddr
    });

    if (!paymentUrl) {
      return res.status(500).json({ message: "Lỗi cấu hình VNPAY" });
    }

    res.status(200).json({ paymentUrl });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.vnpayReturn = (req, res) => {
   let vnpParams = req.query;
   
   // 1. Validate Checksum (Chữ ký bảo mật)
   const isValidSignature = vnpayService.vnpayReturn(vnpParams);

   if (isValidSignature) {
       // 2. Check xem giao dịch thành công hay thất bại tại cổng VNPAY
       if(vnpParams['vnp_ResponseCode'] === '00') {
           // Giao dịch thành công
           // TODO: Cập nhật trạng thái đơn hàng trong Database của bạn thành 'PAID'
           return res.redirect('http://localhost:5173/payment-success?code=00');
       } else {
           // Giao dịch thất bại / Hủy
           return res.redirect('http://localhost:5173/payment-fail?code=' + vnpParams['vnp_ResponseCode']);
       }
   } else {
       // Chữ ký không hợp lệ (Có thể do tấn công giả mạo)
       console.log("Invalid Signature");
       return res.redirect('http://localhost:5173/payment-fail?error=invalid_signature');
   }
};