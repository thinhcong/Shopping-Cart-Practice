import React from 'react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link, Outlet } from 'react-router-dom';

 const HomeLayout = ({userInfo}) => {
  return (
    
<div className='h-full flex bg-white'>
<Sidebar className='h-full'>
  <Menu>
    <SubMenu  label="Danh sách">
      <MenuItem component={<Link to="/brand/jordan" />}  > Jordan </MenuItem>
      <MenuItem component={<Link to="/brand/nike" />}> Nike </MenuItem>
       <MenuItem component={<Link to="/brand/adidas" />}> Adidas </MenuItem>
    </SubMenu>
    
  </Menu>
</Sidebar>
  <div className='flex-1'>
    <Outlet></Outlet>
    </div>
</div>
  

  )
}
 export default HomeLayout



