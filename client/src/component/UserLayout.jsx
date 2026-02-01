import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

const UserLayout = () => {
  return (
     
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

    
      <div className="flex-1 p-10">
          <Outlet />
      </div>

    </div>
  )
}
export default UserLayout