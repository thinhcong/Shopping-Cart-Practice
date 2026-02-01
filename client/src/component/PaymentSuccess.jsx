import React from 'react'
import { Link } from 'react-router-dom';

 const PaymentSuccess = () => {
  return (
      <>
     <div className='flex justify-between items-center'>
      <h1 className='text-black text-6xl'>
        THANH TOÁN THÀNH CÔNG 
         </h1>
         <Link to = "/">
         <button className='bg-black text-white text-3xl '> QUAY LẠI TRANG CHỦ </button>
         </Link>
         
    </div>
    </>
  )
}

export default PaymentSuccess;
