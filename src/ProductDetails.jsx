import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from './component/Header';

const ProductDetails = ({ productList, handleAddToCart, cartList }) => {
  const params = useParams();
  const [product, setProduct] = useState(null);
  
  // State quản lý số lượng mua
  const [buyquantity, setbuyQuantity] = useState(1);

  useEffect(() => {
    // Tìm sản phẩm dựa trên ID (Chuyển về string để so sánh an toàn)
    if (productList && productList.length > 0) {
      const foundProduct = productList.find(item => item.id.toString() === params.id);
      setProduct(foundProduct);
    }
  }, [productList, params.id]);

 const handleAdd = () => {
    if (buyquantity >= 1) {
        setbuyQuantity(prev => prev + 1);
        console.log("Add")
    }
    
   
  }

 const handleDecrease = () => {
    if (buyquantity > 1) {
        setbuyQuantity(prev => prev - 1);
    }
  }

  // Hàm tăng số lượng
  

  // Hàm giảm số lượng (Không cho giảm dưới 1)
 

  // Nếu chưa tìm thấy sản phẩm
  if (!product) {
    return <div className="min-h-screen flex items-center justify-center text-xl">Đang tải dữ liệu...</div>;
  }

  return (
    
    // 1. Container chính: Căn giữa, nền xám nhẹ
    <>  
    
   
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
      
      
      {/* 2. Khung thẻ sản phẩm (Card): Nền trắng, đổ bóng, bo góc */}
      <div className="max-w-6xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        
        {/* 3. Layout chia 2 cột: Mobile thì dọc (flex-col), PC thì ngang (md:flex-row) */}
        <div className="flex flex-col md:flex-row">
          
          {/* ============ CỘT TRÁI: HÌNH ẢNH ============ */}
          <div className="md:w-1/2 bg-gray-100 p-8 flex items-center justify-center relative">
            <img 
              src={product.img} 
              alt={product.name} 
              className="w-full h-[400px] object-contain hover:scale-110 transition-transform duration-500 cursor-zoom-in" 
            />
            {/* Tag nhỏ trang trí */}
            <span className="absolute top-4 left-4 bg-black text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded">
              New Arrival
            </span>
          </div>

          {/* ============ CỘT PHẢI: THÔNG TIN ============ */}
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col">
            
            {/* Tên sản phẩm */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {product.name}
            </h1>

            {/* Giá & Đánh giá */}
            <div className="flex items-center mb-6">
              <p className="text-3xl text-red-600 font-bold mr-4">
                {product.price.toLocaleString()} ₫
              </p>
              <div className="flex text-yellow-400 text-sm">
                ★★★★★ <span className="text-gray-400 ml-2">(50 reviews)</span>
              </div>
            </div>

            {/* Mô tả / Thuộc tính */}
            <p className="text-gray-600 mb-8 leading-relaxed text-lg">
              {product.description || "Sản phẩm chất lượng cao, thiết kế hiện đại, phù hợp với mọi nhu cầu sử dụng hàng ngày của bạn. Chất liệu bền bỉ và thoải mái."}
            </p>

           


            <div className="flex flex-col sm:flex-row gap-4 mt-auto pt-6 border-t border-gray-100">
              

              <div className="flex items-center border border-gray-300 rounded-lg w-fit">
                <button 
                 onClick={() => handleDecrease()}
                  className="px-4 py-3 bg-black text-white hover:bg-gray-100transition"
                >
                  -
                </button>
                <span className="px-4 py-3 font-semibold text-gray-900 min-w-[3rem] text-center">
                  {buyquantity}
                </span>
                <button 
            disabled={product.stock <= 0}
                onClick={() => handleAdd()}
                  className="px-4 py-3 bg-black  text-white hover:bg-gray-100transition"
                >
                  +
                </button>
              </div>

              {/* Nút thêm vào giỏ */}
              <button 
                // Gọi hàm từ cha truyền xuống, kèm theo số lượng
                onClick={() => handleAddToCart(product,buyquantity)}
                className="flex-1 bg-black text-white font-bold py-3 px-8 rounded-lg hover:bg-gray-800 active:transform active:scale-95 transition-all shadow-lg hover:shadow-xl"
              >
                THÊM VÀO GIỎ - {(product.price * buyquantity).toLocaleString()} ₫
              </button>
            </div>

          </div>
        </div> 
      </div>
    </div>
     </>
  );
};

export default ProductDetails;