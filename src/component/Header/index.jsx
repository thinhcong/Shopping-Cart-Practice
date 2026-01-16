import React, { useState, useEffect } from 'react'; // Gộp import lại cho gọn
import { Link } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
// Sửa lại đường dẫn import (bạn kiểm tra lại thực tế file nằm đâu nhé)

 // Kiểm tra lại tên thư mục
import { supabase } from '../../supabaseClient.js';
import AuthModal from '../Authmodal.jsx/index.jsx';

const Header = ({user,cartList}) => {
    
    const [isOpen, setIsOpen] = useState(false);
    const handleLogout = async () => {
        await supabase.auth.signOut();
    }

    let totalAmount = cartList.reduce((total, item) => total + item.price * item.quantity, 0);
    let totalQuantity = cartList.reduce((total, item) => total + item.quantity, 0);

    return (
        <header className="bg-white text-black py-4 px-8 flex justify-between items-center shadow-lg border-b border-gray-200 h-20">

            {/* Logo */}
            <div className="flex-1">
                <Link to="/">
                    <h1 className="text-3xl font-extrabold tracking-widest uppercase font-serif cursor-pointer">
                        Brian Authentic
                    </h1>
                </Link>
            </div>

            {/* Khu vực bên phải */}
            <div className="flex items-center gap-6">

                {/* --- LOGIC HIỂN THỊ USER --- */}
                {user ? (
                    // TRƯỜNG HỢP 1: ĐÃ ĐĂNG NHẬP (Hiện tên + Nút đăng xuất)
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-bold hidden md:block">
                            {user.user_metadata?.full_name || "Khách hàng"}
                        </span>
                        <button 
                            onClick={handleLogout} 
                            className="text-sm bg-black text-white px-3 py-1 rounded hover:bg-gray-800 transition"
                        >
                            Đăng xuất
                        </button>
                    </div>
                ) : (
                    // TRƯỜNG HỢP 2: CHƯA ĐĂNG NHẬP (Hiện icon User để mở modal)
                    <div 
                        onClick={() => setIsOpen(true)} 
                        className="flex flex-col items-center justify-center text-gray-600 hover:text-black transition cursor-pointer"
                    >
                        <FaUser className='w-6 h-6' />
                    </div>
                )}
                {/* --------------------------- */}

                {/* Giỏ hàng */}
                <Link to="/cart">
                    <div className="flex flex-col items-center justify-center cursor-pointer text-gray-700 hover:text-black transition duration-300">
                        <div className="relative">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                            {totalQuantity > 0 && (
                                <span className="absolute -top-1 -right-2 bg-red-600 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white">
                                    {totalQuantity}
                                </span>
                            )}
                        </div>
                        {totalAmount > 0 && (
                            <span className="text-sm font-bold mt-1 leading-none">
                                {totalAmount.toLocaleString()}đ
                            </span>
                        )}
                    </div>
                </Link>

                {/* Modal Auth */}
                <AuthModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
            </div>
        </header>
    )
}

export default Header