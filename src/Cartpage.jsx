import React from 'react'
import { Link } from 'react-router-dom'
import { createClient } from '@supabase/supabase-js'

// 1. Cấu hình Supabase (Thay URL và Key của bạn vào đây)
// const supabaseUrl = 'https://xyzcompany.supabase.co'
// const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6...' // Anon Key (Public)
// const supabase = createClient(supabaseUrl, supabaseKey)
// /**
//  * Hàm gửi đơn hàng lên Supabase
//  * @param {Object} customerInfo - Thông tin khách { name, phone, address, note }
//  * @param {Array} cartItems - Mảng sản phẩm [{ id, quantity, price }]
//  * @param {String|null} userId - ID người dùng (nếu đã đăng nhập), hoặc null
//  */

function CartPage({ cartList, handleDelete ,handleAddToCart }) {
    

  const totalAmount = cartList.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto p-10 bg-white  min-h-screen">
      {cartList.length > 0 && <h1 className="text-3xl font-bold mb-8 text-center uppercase tracking-wide">SHOPPING CART</h1>}

      {cartList.length === 0 ? (
        <div className="text-center">
            <p className="text-xl text-gray-500 mb-4">Giỏ hàng đang trống trơn!</p>
            <Link to="/" className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition">
                Quay lại mua sắm
            </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
            {/* Header của bảng */}
            <div className="grid grid-cols-5 border-b-2 border-gray-200 pb-4 font-bold text-gray-700">
                <div className="col-span-2">Sản phẩm</div>
                <div className="text-center">Đơn giá</div>
                <div className="text-center">Số lượng</div>
                <div className="text-center">Thao tác</div>
            </div>

            {/* Danh sách sản phẩm */}
            {cartList.map((item, index) => (
                <div key={index} className="grid grid-cols-5 items-center border-b border-gray-100 py-4 hover:bg-gray-50">
                    {/* Cột 1: Ảnh + Tên */}
                    <div className="col-span-2 flex items-center gap-4">
                        <img src={item.img} alt={item.name} className="w-20 h-20 object-cover rounded shadow-sm" />
                        <div>
                            <h3 className="font-bold text-lg">{item.name}</h3>
                            <p className="text-sm text-gray-500">Mã: #{item.id}</p>
                        </div>
                    </div>

                    {/* Cột 2: Giá */}
                    <div className="text-center font-medium">
                        {item.price.toLocaleString()} ₫
                    </div>

                    {/* Cột 3: Số lượng */}
                    <div className="text-center">
                        <span className="bg-gray-200 px-3 py-1 rounded">x {item.quantity}</span>
                    </div>

                    {/* Cột 4: Nút xóa */}
                    <div className="flex justify-center gap-4">
                        <button 
                            onClick={() => handleDelete(item)}
                            className="text-black font-bold  "
                        >
                            -
                        </button>
                         <button 
                            onClick={() => handleAddToCart(item)}
                            className="text-black  font-bold "
                        >
                            +
                        </button>
                    </div>
                </div>
            ))}

            {/* Tổng tiền và Thanh toán */}
            <div className="flex justify-end mt-8 items-center gap-6">
                <div className="text-2xl font-bold">
                    Tổng cộng: <span className="text-red-600">{totalAmount.toLocaleString()} ₫</span>
                </div>
                <button className="bg-black text-white text-lg px-8 py-3 rounded shadow hover:bg-green-700 transition transform active:scale-95">
                    Thanh Toán
                </button>
            </div>
        </div>
      )}
    </div>
  )
}

export default CartPage