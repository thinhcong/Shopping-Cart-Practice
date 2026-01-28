import React from 'react'
import MainContent from '../component/MainContent/index.jsx'
 function Home({ productList, cartList, handleAddToCart, handleDelete, userInfo }) {
  return (
    // 1. Thay thẻ Fragment <> bằng div bao ngoài full màn hình
   
     
      <div className=''>    
        <MainContent
          productList={productList} 
          handleAddToCart={handleAddToCart} 
          handleDelete={handleDelete}
          cartList={cartList}
        />
      </div>     
    
  )
}
export default Home





