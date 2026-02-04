const crypto = require('crypto');
const querystring = require('querystring'); // Dùng thư viện chuẩn của Node

exports.createVNPayUrl = ({ amount, orderId }) => {

  const vnp_TmnCode = process.env.VNP_TMN_CODE;
  const vnp_HashSecret = process.env.VNP_HASH_SECRET;
  const vnp_Url = process.env.VNP_URL;
  const vnp_ReturnUrl = process.env.VNP_RETURN_URL;



  
  if (!vnp_Url || !vnp_HashSecret || !vnp_TmnCode) {
      console.error("LỖI: Thiếu biến môi trường VNPAY trong file .env");
      return null;
  }

  const date = new Date();
  const createDate = date.toISOString().slice(0,19).replace(/[-T:]/g,''); 

  let vnp_Params = {
    vnp_Version: '2.1.0',
    vnp_Command: 'pay',
    vnp_TmnCode: vnp_TmnCode,
    vnp_Locale: 'vn',
    vnp_CurrCode: 'VND',
    vnp_TxnRef: orderId,
    vnp_OrderInfo: 'Thanh toan don hang ' + orderId,
    vnp_OrderType: 'other',
    vnp_Amount: amount * 100, 
    vnp_ReturnUrl: vnp_ReturnUrl,
    vnp_IpAddr: '127.0.0.1', 
    vnp_CreateDate: createDate
  };

 
  vnp_Params = sortObject(vnp_Params);

 
  const signData = querystring.stringify(vnp_Params, { encode: false });
  const hmac = crypto.createHmac("sha512", vnp_HashSecret);
  const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex"); 
  vnp_Params['vnp_SecureHash'] = signed;

 
  const finalUrl = vnp_Url + "?" + querystring.stringify(vnp_Params, { encode: false });
  
  return finalUrl;
};


function sortObject(obj) {
  let sorted = {};
  let keys = Object.keys(obj).sort();

  keys.forEach((key) => {
    sorted[key] = obj[key];
  });

  return sorted;
}