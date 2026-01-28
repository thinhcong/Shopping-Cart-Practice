
import { Routes, Route, Navigate } from 'react-router-dom' // Import Router
import './App.css'
import Header from './component/Header/index.jsx';
import Home from './Page.jsx/Home.jsx';
import CartPage from './Page.jsx/Cartpage.jsx';
import ProductDetails from './Page.jsx/ProductDetails.jsx';
import Footer from './component/Footer.jsx/index.jsx';
import UserProfile from './component/UserInfo.jsx';
import { UserOrder } from './component/UserOrder.jsx';
import WishList from './component/UserWishList.jsx';
import HomeLayout from './component/HomeLayout.jsx/index.jsx';
import UserLayout from './component/UserLayout.jsx';
import ProductsPage from './Page.jsx/ProductsPage.jsx';
import { useShop } from './ShopContext.jsx';
import AdminUsers from './component/AdminUsers.jsx';
import AdminProducts from './component/AdminProducts.jsx';
import AdminOrder from './component/AdminOrder.jsx';
import { AdminLayout } from './component/AdminLayout.jsx';









function App() {
    const {
    cartList,
    productList,
    handleAddToCart,
    handleDelete,
    userInfo,
    handleLogout,
    admin,
    user,
    addWishList
  } = useShop();




  return (
    <div className='flex flex-col min-h-screen'>
        <Header cartList={cartList} handleLogout={handleLogout} admin={admin} user={user} />

    <div className='flex flex-1 '>
        <Routes>

     
        <Route element={<HomeLayout userInfo={userInfo} />}>
            
            <Route path="/" element={
              <Home 
                userInfo={userInfo} 
                cartList={cartList} 
                productList={productList} 
                handleAddToCart={handleAddToCart} 
              />
            } />
              <Route path="brand/:categoryName" element={
      <ProductsPage
           addWishList={addWishList}
            handleAddToCart={handleAddToCart}
                 cartList={cartList} 
                productList={productList} 
             // Nhớ truyền prop này
        />
    } />

         
            <Route path="product/:id" element={
              <ProductDetails 
                cartList={cartList} 
                handleAddToCart={handleAddToCart} 
                productList={productList} 
              />
            } />

            
            <Route path="cart" element={
               <CartPage 
                 cartList={cartList} 
                 handleAddToCart={handleAddToCart} 
                 handleDelete={handleDelete} 
               />
            } />
        </Route>


       
        <Route path="/user" element={<UserLayout userInfo={userInfo} />}>

            <Route index element={<Navigate to="profile" replace />} />
            
            <Route path="profile" element={<UserProfile userInfo={userInfo}/>} /> 
            <Route path="orders" element={<UserOrder />} /> 
            <Route path="wishlist" element={<WishList productList={productList}  
             />} /> 
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="products" replace />} />
            <Route path="products" element={<AdminProducts/>} />
            <Route path="orders" element={<AdminOrder/>} />
            <Route path="users" element={<AdminUsers/>} />

          </Route>
          


      </Routes>

    </div>
      <Footer/>

          
      </div>
    
  )
}

export default App