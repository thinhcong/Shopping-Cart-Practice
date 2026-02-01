import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { supabase } from '../supabaseClient.js/index.jsx'
import ProductCard from '../component/ProductCards.jsx';
import { useParams } from 'react-router-dom'
 const ProductsPage = ({handleAddToCart,handleDelete}) => {
const [products, setProducts] = useState([])    
  const { categoryName } = useParams();
    useEffect(() => {
        const fetchProducts = async () => {
            const {data, error} = await supabase
            .from ('products')
            .select ('*')
            .eq('category',categoryName)
            if (error) {
                console.error(error);
                return;
            }
            setProducts(data);
         
        


        }
         fetchProducts();
    },[categoryName]);
      

  return (
        <div className="w-full h-full p-4">
            

            {/* 4. Layout Grid để chia cột */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.length > 0 ? (
                    // 5. Lặp qua danh sách products và render từng ProductCard
                    products.map((item) => (
                        <ProductCard 
                            handleDelete={handleDelete}
                            key={item.id} 
                            product={item} 
                            handleAddToCart={handleAddToCart} 
                            showWishlist={true}
                        />
                    ))
                ) : (
                    <p>Không tìm thấy sản phẩm nào của hãng này.</p>
                )}
            </div>
        </div>
    );

  
  
}
export default ProductsPage