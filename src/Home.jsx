import React from 'react'
import LeftSidebar from './component/LeftSidebar'
import MainContent from './component/MainContent'
import Footer from './component/Footer.jsx'


 function Home({ productList, cartList, handleAddToCart, handleDelete }) {
  return (
    // 1. Thay thẻ Fragment <> bằng div bao ngoài full màn hình
    <div className="flex flex-col h-screen">
      
     
      <div className='flex flex-1 overflow-hidden'>
        <LeftSidebar />
        
       
        <MainContent 
          productList={productList} 
          handleAddToCart={handleAddToCart} 
          handleDelete={handleDelete}
          cartList={cartList}
        />
      </div>

      <Footer />
      
    </div>
  )
}
export default Home





