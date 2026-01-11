// import React from 'react'

//  const RightSidebar = (props) => {
//   return (
//     <div className="h-full overflow-y-auto">
//       {
//         props.cartList.map((item, index) => {
//           return (
//           <div key={index} className='flex flex-col   h-fit w-fit ' style={{border: "1px solid black", textAlign: "center", margin: "10px", padding: " 10px"}}>
//            <div className="w-full h-48 mb-3 overflow-hidden rounded-md bg-gray-100">
//                   <img 
//                     src={item.img} 
//                     alt={item.name} 
//                     className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
//                   />
//               </div>
//               <div className='text-black'>
//                 <p> {item.name}</p>
//             <p>price:{item.price.toLocaleString()}đ</p>
//             <p>số lượng: {item.quantity}</p>
//             <button style={{border: "1px solid black"}} onClick={() => props.handleDelete(item)}>Delete</button>
//               </div>
            
//           </div>
//           )
//         }      
//         )
//       }

//     </div>
//   )
// }

// export default RightSidebar