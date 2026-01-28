import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 py-12 border-t border-gray-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Grid Layout chia 3 cột */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          
          {/* === CỘT 1: THƯƠNG HIỆU & LIÊN HỆ === */}
          <div className="flex flex-col space-y-4">
            {/* Logo Text cách điệu */}
            <h2 className="text-2xl font-bold text-white uppercase tracking-[0.2em] mb-2">
              Brian<span className="text-gray-500">Authentic</span>
            </h2>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
              Chuyên cung cấp các sản phẩm thời trang chính hãng 100%. 
              Uy tín và chất lượng là kim chỉ nam hoạt động của chúng tôi.
            </p>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-3">
                {/* Icon Phone */}
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                <span className="hover:text-white transition cursor-pointer">0909.888.999</span>
              </div>
              <div className="flex items-center gap-3">
                {/* Icon Mail */}
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                <span className="hover:text-white transition cursor-pointer">contact@brianauthentic.com</span>
              </div>
            </div>
          </div>

          {/* === CỘT 2: HỖ TRỢ & ĐỊA CHỈ === */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-wider mb-6 text-sm">Về Chúng Tôi</h3>
            <ul className="space-y-3 text-sm mb-6">
              <li><a href="#" className="hover:text-white hover:underline transition">Giới thiệu cửa hàng</a></li>
              <li><a href="#" className="hover:text-white hover:underline transition">Chính sách bảo hành</a></li>
              <li><a href="#" className="hover:text-white hover:underline transition">Hướng dẫn mua hàng</a></li>
              <li><a href="#" className="hover:text-white hover:underline transition">Kiểm tra đơn hàng</a></li>
            </ul>
            
            <h3 className="text-white font-bold uppercase tracking-wider mb-3 text-sm">Địa chỉ Store</h3>
            <div className="flex gap-3 text-sm leading-6">
               <svg className="w-5 h-5 text-white flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
               <p>
                 Lầu 2, Chung cư 42 Nguyễn Huệ,<br/>
                 Phường Bến Nghé, Quận 1,<br/> 
                 TP. Hồ Chí Minh
               </p>
            </div>
          </div>

          {/* === CỘT 3: ĐĂNG KÝ NHẬN TIN (NEWSLETTER) === */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-wider mb-6 text-sm">Đăng ký nhận tin</h3>
            <p className="text-sm text-gray-400 mb-4">
              Nhận thông tin về các sản phẩm mới nhất và mã giảm giá độc quyền.
            </p>
            
            <form className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="Nhập email của bạn..." 
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded focus:outline-none focus:border-white text-sm text-white transition-colors"
              />
              <button className="w-full bg-white text-black font-bold py-2 rounded hover:bg-gray-200 transition uppercase text-sm tracking-wide">
                Đăng ký ngay
              </button>
            </form>

            {/* Social Icons */}
            <div className="mt-8">
                <span className="text-xs uppercase font-bold text-gray-500 mb-3 block">Kết nối với chúng tôi</span>
                <div className="flex gap-4">
                    {/* Facebook Icon */}
                    <a href="#" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-blue-600 hover:text-white transition duration-300">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                    </a>
                    {/* Instagram Icon */}
                    <a href="#" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-pink-600 hover:text-white transition duration-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                    </a>
                    {/* Tiktok Icon (Simple SVG representation) */}
                    <a href="#" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-black hover:border hover:border-white hover:text-white transition duration-300">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
                    </a>
                </div>
            </div>
          </div>

        </div>

        {/* Copyright Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-xs text-gray-600 flex flex-col md:flex-row justify-between items-center">
            <p>&copy; 2024 BrianAuthentic. All rights reserved.</p>
            <div className="flex gap-4 mt-2 md:mt-0">
                <span className="cursor-pointer hover:text-gray-400">Privacy Policy</span>
                <span className="cursor-pointer hover:text-gray-400">Terms of Service</span>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;