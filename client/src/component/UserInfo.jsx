import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient.js';

const UserProfile = ({ userInfo }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);
  

  useEffect(() => {
    if (userInfo) {
      setFormData({
        fullName: userInfo.full_name || '',
        phone: userInfo.phone || '',
        address: userInfo.address || '',
        email: userInfo.email || userInfo.username || 'user123',
      });
    }
  }, [userInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = async () => {
    if(!userInfo.id) return;
    console.log("ok")
    try {
      setLoading(true);
      const {error} = await supabase
      .from ('profiles')
      .update({
        full_name :formData.fullName,
        phone : formData.phone,
        address : formData.address,
    })
      .eq('id',userInfo.id)
      if(error)
throw (error);
      alert('cập nhật thành công');

    } catch (error) {
      console.log ("lỗi update",error);
    } finally {
      setLoading(false);
    }
  }      
  return (
   
    
      
    
      <div className="w-full bg-white shadow-sm rounded-lg p-8">
        
        {/* HEADER */}
        <div className="border-b border-gray-200 pb-6 mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800">Hồ sơ của tôi</h2>
          <p className="text-gray-500 mt-1 text-sm">
            Quản lý thông tin hồ sơ để bảo mật tài khoản
          </p>
        </div>

        {/* FORM */}
        <form className="space-y-6">
            {/* Tên đăng nhập */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-2">
                Tên đăng nhập / Email
              </label>
              <div className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md text-gray-500 cursor-not-allowed flex justify-between items-center">
                <span>{formData.email}</span>
                <span className="text-xs text-gray-400 italic">(Không thể thay đổi)</span>
              </div>
            </div>

            {/* Grid 2 cột */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-2">
                  Tên hiển thị
                </label>
                <input 
                  type="text" 
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Nhập tên hiển thị"
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-2">
                  Số điện thoại
                </label>
                <input 
                  type="text" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Nhập số điện thoại"
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                />
              </div>
            </div>

            {/* Địa chỉ */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-2">
                Địa chỉ nhận hàng
              </label>
              <input 
                type="text" 
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Ví dụ: Số 1, Đường ABC, Quận XYZ..."
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              />
            </div>

            
            <div className="pt-6 flex justify-center">
              <button onClick={() => handleUpdateProfile()} 
                
                type="button" 
                disabled={loading}
                className={`bg-gray-900 text-white px-10 py-3 rounded-md shadow-lg transition-all font-medium min-w-[200px] 
                  ${loading ? 'opacity-70 cursor-wait' : 'hover:bg-gray-700 hover:shadow-xl'}`}
              >
                {loading ? 'Đang cập nhật' : 'Lưu '}
              </button>
            </div>
        </form>

      </div> 
  )
}

export default UserProfile;