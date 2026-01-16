import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom' // Import Router
import './App.css'
import { supabase } from "./supabaseClient.js";

/////////////////////////////////////// PRATICE NEW FEATURE ///////////////////////////////////////////////


// Disable nút + khi vượt stock

// Disable “Thêm vào giỏ” khi stock = 0

// Hiển thị: “Bạn đã có X sản phẩm này trong giỏ”


/////////////////////////////////////// PRATICE NEW FEATURE ///////////////////////////////////////////////



// Import các component

import Home from './Home.jsx'        
import CartPage from './Cartpage.jsx' 
import ProductDetails from './ProductDetails.jsx';
import Header from './component/Header/index.jsx';





function App() {

  
  const [productList, setProductList] = useState([]);
  const [cartList, setCartList] = useState ([]);
  
    const [user, setUser] = useState(null);
    const [admin,setAdmin] = useState(null);  
    useEffect(() => {
        
        const getSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user ?? null);
        };
        getSession();

        //  Lắng nghe đăng nhập/đăng xuất
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
    
    };
//   // (() => {
//   //   const savedCart = localStorage.getItem("myCart");
//   //   return savedCart ? JSON.parse(savedCart) : [];
//   // });

//   // useEffect(() => {
//   //   localStorage.setItem("myCart", JSON.stringify(cartList));
//   // }, [cartList]); 

useEffect(() => {
  async function fetchProducts() {
    const { data, error } = await supabase
      .from("products")
      .select("*");

    if (error) {
      console.error(error);
      return;
    }

    setProductList(data); 
  }

  fetchProducts();
  const channel = supabase
      .channel('realtime products') 
      .on('postgres_changes', 
          { event: 'UPDATE', schema: 'public', table: 'products' }, 
          (payload) => {
            console.log('Có thay đổi nè:', payload);
            
            // Cập nhật lại state productList ngay lập tức
            setProductList((prevList) => 
              prevList.map((item) => 
                item.id === payload.new.id ? payload.new : item
              )
            );
          }
      )
      .subscribe();

    // 3. Dọn dẹp khi component bị hủy (unmount)
    return () => {
      supabase.removeChannel(channel);
    };

}, []);

  // Hàm xử lí khi nhấn thêm sản phẩm
  const handleAddToCart = (product,buyquantity = 1) => {
    if (product.stock <= 0) {
      alert("Sản phẩm này đã hết hàng!");
      return;
    }
    const isExit = cartList.find((item) => item.id === product.id);

    if (isExit) {
      setCartList(cartList.map((item) => {
        if (item.id === product.id) {
          return { ...item, quantity: item.quantity + buyquantity };
        } else {
          return item
        }
      }))
    } else {
      setCartList([...cartList, { ...product, quantity:  buyquantity }]);
    }

    const newProductList = productList.map(item => {
      if (item.id === product.id) {
        return { ...item, stock: item.stock - buyquantity };
      }
      return item; 
    });
    setProductList(newProductList);
  }
  

// Hàm xử lí khi nhấn xóa
  const handleDelete = (itemCanXoa) => {
    const isExit = cartList.find((item) => item.id === itemCanXoa.id);
    
    if (isExit && isExit.quantity > 1) { 
      setCartList(cartList.map((item) => { 
        if (item.id === itemCanXoa.id) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        } else {
          return item;
        }
      }));
    } else {
      setCartList(cartList.filter((item) => item.id !== itemCanXoa.id));
    }
    
    // Cộng lại stock
    setProductList(productList.map((item) => {
      if (item.id === itemCanXoa.id) {
        return { ...item, stock: item.stock + 1 };
      } else {
        return item;
      }
    }))
  }



  return (
    <div className=''>
      {/* Header luôn hiển thị */}
        <Header cartList={cartList} handleLogout={handleLogout} admin={admin} user={user} />

      {/* Phần nội dung thay đổi theo Router */}
      
        <Routes>
           <Route path="/" element={
              <Home cartList={cartList} productList={productList} handleAddToCart={handleAddToCart}
               
              />
           } />

           <Route path="/cart" element={
              <CartPage cartList={cartList} handleAddToCart={handleAddToCart} handleDelete={handleDelete}
                
              />
           } />
            <Route path="/product/:id" element={
                <ProductDetails cartList={cartList} handleAddToCart={handleAddToCart} productList={productList} 
               

            />
            }/>

           
        </Routes>

          
      </div>
    
  )
}

export default App