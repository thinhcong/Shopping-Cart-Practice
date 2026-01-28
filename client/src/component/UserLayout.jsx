import React from 'react'
import { Outlet, Link, Navigate } from 'react-router-dom'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar'
import { useShop } from '../ShopContext'

const UserLayout = () => {
  const { userInfo } = useShop()

  // Chưa login
  if (!userInfo) return <Navigate to="/login" />

  const isAdmin = userInfo.role === 'admin'

  return (
    <div className="flex w-full min-h-screen bg-gray-50">

      <Sidebar>
        <Menu>

          {/* USER MENU */}
          {!isAdmin && (
            <SubMenu label="Tài khoản">
              <MenuItem component={<Link to="/user/profile" />}>
                Thông tin tài khoản
              </MenuItem>
              <MenuItem component={<Link to="/user/orders" />}>
                Lịch sử đơn hàng
              </MenuItem>
              <MenuItem component={<Link to="/user/wishlist" />}>
                Yêu thích
              </MenuItem>
            </SubMenu>
          )}

          {/* ADMIN MENU */}
          {isAdmin && (
            <SubMenu label="Admin Dashboard">
              <MenuItem component={<Link to="/admin/products" />}>
                Quản lý sản phẩm
              </MenuItem>
              <MenuItem component={<Link to="/admin/orders" />}>
                Quản lý đơn hàng
              </MenuItem>
              <MenuItem component={<Link to="/admin/users" />}>
                Quản lý người dùng
              </MenuItem>
            </SubMenu>
          )}

        </Menu>
      </Sidebar>

      <div className="flex-1 p-10">
        <Outlet />
      </div>
    </div>
  )
}

export default UserLayout
