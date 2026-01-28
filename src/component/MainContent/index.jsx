import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../ProductCards.jsx';

const MainContent = ({productList,handleAddToCart}) => {
  const navigate = useNavigate();
  const goToDetail = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className='flex-1 h-full overflow-y-auto p-4 bg-gray-50'>
      <div className="grid grid-cols-4 gap-4">
        
        {productList.map((product, index) => {
          return (
            <ProductCard
              key={index}
              product={product}
              handleAddToCart={handleAddToCart}
              showWishlist={true}
            />
          );
        })}
      </div>
    </div>
  )
}
export default MainContent