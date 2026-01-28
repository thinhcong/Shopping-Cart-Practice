import React, { useState } from 'react'; // Bỏ useEffect nếu không dùng
import { FaTimes } from 'react-icons/fa'; 
import { supabase } from '../supabaseClient.js'

const AuthModal = ({ isOpen, onClose }) => {
    const [isRegister, setIsRegister] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState(''); 
    const [isLoading, setIsLoading] = useState(false); 

    if (!isOpen) return null;

    const handleAuth = async () => {
    
        if (!email || !password || (isRegister && !name)) {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        setIsLoading(true);
        try {
            if (isRegister) {
           
                const { data, error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            full_name: name, 
                        },
                    },
                });
                
                if (error) throw error;
                alert("Đăng ký thành công! Hãy kiểm tra email để xác thực.");
                setIsRegister(false); // Chuyển về tab đăng nhập sau khi đăng ký xong
            } else {
                // --- ĐĂNG NHẬP ---
                const { data, error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });

                if (error) throw error;
                
                alert("Đăng nhập thành công!");
                onClose(); 
                window.location.reload(); 
            }
        } catch (error) {
            alert(error.message || "Có lỗi xảy ra");
        } finally {
            setIsLoading(false);
        }
    };
  

    return (
        // Thêm onClick={onClose} ở đây để bấm ra ngoài đen đen thì đóng modal
        <div 
            className="fixed inset-0 bg-amber-100/20 bg-opacity-50 z-50 flex justify-center items-center"
            onClick={onClose} 
        >
            
            <div 
                className="bg-white w-96 rounded-lg shadow-xl overflow-hidden relative animate-fadeIn"
                onClick={(e) => e.stopPropagation()} 
            >
                
                <button 
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
                >
                    <FaTimes size={20} />
                </button>

                <div className="p-6 pb-0 text-center">
                    <h2 className="text-2xl font-bold text-gray-800">
                        { isRegister ? 'Đăng Ký' : 'Đăng Nhập'}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">Chào mừng bạn đến với Brian Authentic</p>
                </div>

                <div className="p-6 space-y-4">
                    
                    {isRegister && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tên khách hàng</label>
                            <input 
                                onChange={(e) => setName(e.target.value)}
                                value={name} // Nên thêm value để control input
                                type="text" 
                                placeholder="Nhập tên hiển thị..." 
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tài khoản / Email</label>
                        <input 
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            type="email" // Đổi type="text" thành "email" để bàn phím điện thoại hiện @
                            placeholder="Nhập email..." 
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
                        <input 
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            type="password" 
                            placeholder="Nhập mật khẩu..." 
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                    </div>

                    {/* Nút bấm có hiệu ứng Loading */}
                    <button 
                       onClick={handleAuth}
  disabled={isLoading}
                        className={`w-full text-white py-2 rounded-md font-bold transition duration-300 mt-2 
                            ${isLoading ?'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-800'}`
                        }
                    >
                        {isLoading ? 'Đang xử lý...' : (isRegister ? 'ĐĂNG KÝ NGAY' : 'ĐĂNG NHẬP')}
                    </button>
                </div>

                <div className="bg-gray-100 p-4 text-center text-sm">
                    {isRegister ? (
                     <p>Đã có tài khoản? <span onClick={() => setIsRegister(false)}   className="text-blue-600 font-bold cursor-pointer hover:underline">Đăng nhập</span></p>
                    ) : (
                        <p>Chưa có tài khoản? <span onClick={() => setIsRegister(true)} className="text-blue-600 font-bold cursor-pointer hover:underline">Đăng ký</span></p>
                    )}
                </div>

            </div>
        </div>
    );
};

export default AuthModal;