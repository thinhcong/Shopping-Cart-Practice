import React from 'react'
import LeftSidebar from './LeftSidebar'

import MainContent from './MainContent'

function Home({ productList, handleAddToCart, updateStock, }) {
  return (
    <div className='flex flex-1 overflow-hidden'>
      {/* 3 thành phần giao diện cũ được gom vào đây */}
      <LeftSidebar />
      <MainContent 
         updateStock={updateStock} 
          productList={productList} // Chú ý: prop này tên là ListProduct hay productList tùy vào bên MainContent nhận gì
         handleAddToCart={handleAddToCart} 
     
      />
      {/* <RightSidebar 
         updateStock={updateStock} 
         handleDelete={handleDelete} 
         cartList={cartList} 
      /> */}
    </div>
  )
}

export default Home