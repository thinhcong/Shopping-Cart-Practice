import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar'
export const AdminLayout = () => {
 return (
    
    <div className="flex w-full min-h-screen bg-gray-50">
       
      <Sidebar>
        <Menu>
          <SubMenu label="Tài khoản">
            <MenuItem component={<Link to="/admin/Orders" />}>Quản lí đơn hàng</MenuItem>
            <MenuItem component={<Link to="/admin/Users" />}>Quản lí khách hàng</MenuItem>
            <MenuItem component={<Link to="/admin/Products" />}>Quản lí sản phẩm </MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar>

    
      <div className="flex-1 p-10">
          <Outlet />
      </div>

    </div>
  )
}
