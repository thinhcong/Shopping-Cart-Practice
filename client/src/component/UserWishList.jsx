import React from 'react'
import { Link } from 'react-router-dom'
import { useShop } from '../ShopContext'
import ProductCard from './ProductCards.jsx';

 const WishList = ({}) => {
  const { wishList,handleAddToCart } = useShop();
  return (
   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {wishList.length > 0 ? (
                    
                    wishList.map((item) => (
                        <ProductCard 
                        handleAddToCart ={handleAddToCart}  
                            showWishList
                            key={item.id} 
                            product={item.products} 
                          
                        />
                    ))
                ) : (
                    <p>Không tìm thấy sản phẩm nào của hãng này.</p>
                )}
            </div>
  )
}
 
export default WishList 