import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

const UserLayout = () => {
  return (
    // Container cha: Full width, Full height
    <div className="flex w-full min-h-screen bg-gray-50">
       
      <Sidebar>
        <Menu>
          <SubMenu label="Tài khoản">
            <MenuItem component={<Link to="/user/profile" />}>Thông tin tài khoản</MenuItem>
            <MenuItem component={<Link to="/user/orders" />}>Lịch sử đơn hàng</MenuItem>
            <MenuItem component={<Link to="/user/wishlist" />}>Yêu thích</MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar>

      {/* 
         SỬA LẠI ĐOẠN NÀY:
         1. Bỏ 'flex justify-center'. Flexbox ở đây làm phức tạp vấn đề.
         2. Chỉ cần 'flex-1' để chiếm hết chỗ trống.
         3. 'p-10' để tạo khoảng cách đẹp mắt so với lề.
      */}
      <div className="flex-1 p-10">
          <Outlet />
      </div>

    </div>
  )
}
export default UserLayout