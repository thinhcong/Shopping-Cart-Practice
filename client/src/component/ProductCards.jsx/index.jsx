// components/ProductCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../../ShopContext';

const ProductCard = ({ product, handleAddToCart, showWishlist }) => {
  const { addWishList, wishList } = useShop();
  const navigate = useNavigate();

  // 1. SỬA LỖI LOGIC: Phải dùng === để tìm xem sản phẩm có trong danh sách không
 const isLiked = wishList?.some((item) => item.id === product.id);

  const goToDetail = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div
      onClick={() => goToDetail(product.id)}
      className="border border-gray-200 rounded-lg p-3 bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col h-full cursor-pointer group"
    >
      <div className="w-full h-48 mb-3 overflow-hidden rounded-md bg-gray-100">
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
      </div>
      <h3 className="font-bold text-gray-800 mb-1 text-sm md:text-base line-clamp-2">
        {product.name}
      </h3>
      <div className="mt-auto">
        <p className="text-red-600 relative flex font-bold text-lg">
          {product.price.toLocaleString()} ₫

          {showWishlist && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                addWishList(product);
              }}
              // 2. CHỈNH SỬA BUTTON:
              // Xóa background cũ (bg-white/80) vì SVG của bạn đã có hình tròn trắng nền (circle fill="white")
              className={`absolute right-2 hover:scale-110 active:scale-95 transition-transform duration-200`}
            >
              {/* --- ĐOẠN SVG MỚI CỦA BẠN --- */}
              <svg 
                width="34" 
                height="34" 
                viewBox="0 0 34 34" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-sm" // Thêm bóng nhẹ cho đẹp nếu muốn
              >
                {/* Hình tròn nền trắng giữ nguyên */}
                <circle cx="17" cy="17" r="17" fill="white" />
                
                {/* Phần trái tim: Thêm logic đổi màu vào đây */}
                <path 
                  d="M13 10C10.7912 10 9 11.7396 9 13.8859C9 15.6185 9.7 19.7305 16.5904 23.8873C16.7138 23.961 16.8555 24 17 24C17.1445 24 17.2862 23.961 17.4096 23.8873C24.3 19.7305 25 15.6185 25 13.8859C25 11.7396 23.2088 10 21 10C18.7912 10 17 12.3551 17 12.3551C17 12.3551 15.2088 10 13 10Z" 
                  
                  // LOGIC ĐỔI MÀU:
                  // Nếu isLiked = true -> Viền đỏ, Tô đỏ
                  // Nếu isLiked = false -> Viền đen (hoặc xám), Không tô
                  stroke={isLiked ? "#DC2626" : "#9CA3AF"} // #DC2626 là red-600, #9CA3AF là gray-400
                  fill={isLiked ? "#DC2626" : "#9CA3AF"} 
                  
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="transition-colors duration-300" // Hiệu ứng chuyển màu mượt
                />
              </svg>
            </button>
          )}

        </p>
        <p className="text-xs text-gray-500 mb-3"></p>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleAddToCart(product);
            console.log('da them');
          }}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 active:bg-gray-900 transition-colors text-sm font-medium"
        >
          Thêm vào giỏ
        </button>
      </div>
    </div>
  );
};

export default ProductCard;