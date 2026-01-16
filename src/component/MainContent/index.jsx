import React from 'react';
import { useNavigate } from 'react-router-dom';

const MainContent = ({productList,handleAddToCart}) => {
  // const [cartList, setCartList] = useState ([]);
  const navigate = useNavigate();




  const goToDetail = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className='flex-1 h-full overflow-y-auto p-4 bg-gray-50'>
      <div className="grid grid-cols-4 gap-4">
        
        {productList.map((product, index) => {
          return (
            // 1. Thêm sự kiện onClick vào thẻ cha để chuyển trang
            // Thêm 'cursor-pointer' để người dùng biết là bấm được
            <div 
              key={index} 
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
                <p className="text-red-600 font-bold text-lg">
                    {product.price.toLocaleString()} ₫
                </p>
                <p className="text-xs text-gray-500 mb-3">
                    Kho: {product.stock}
                </p>
                
                {/* 2. Xử lý nút Button để chặn sự kiện nổi bọt */}
                <button 
                    onClick={(e) => {
                      // QUAN TRỌNG: Dòng này ngăn click cha
                      e.stopPropagation(); 
                      
                      // Sau đó mới chạy logic thêm vào giỏ
                      handleAddToCart(product);
                    }} 
                    className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 active:bg-gray-900 transition-colors text-sm font-medium"
                >
                    Thêm vào giỏ
                </button>
              </div>

            </div>
          )
        })}
        
      </div>
    </div>
  )
}
export default MainContent