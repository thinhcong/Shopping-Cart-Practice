import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom' // Import Router
import './App.css'
import { supabase } from "./supabaseClient.js";




// Import các component
import Header from './component/Header'
import Home from './component/Home'        
import CartPage from './component/CartPage' 
import ProductDetails from './component/ProductDetails/index.jsx';




function App() {

  
  const [productList, setProductList] = useState([]);
  const [cartList, setCartList] = useState ([]);
  // (() => {
  //   const savedCart = localStorage.getItem("myCart");
  //   return savedCart ? JSON.parse(savedCart) : [];
  // });

  // useEffect(() => {
  //   localStorage.setItem("myCart", JSON.stringify(cartList));
  // }, [cartList]); 

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
        return { ...item, stock: item.stock - 1 };
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
      <Header cartList={cartList} />

      {/* Phần nội dung thay đổi theo Router */}
      
        <Routes>
           <Route path="/" element={
              <Home 
                 productList={productList} 
                 cartList={cartList} 
                 handleAddToCart={handleAddToCart}                
                 handleDelete={handleDelete}
              />
           } />

           <Route path="/cart" element={
              <CartPage 
                 handleAddToCart={handleAddToCart}
                 productList={productList}
                 cartList={cartList} 
                 handleDelete={handleDelete}
              />
           } />
            <Route path="/product/:id" element={
                <ProductDetails
                productList={productList} 
                 handleAddToCart ={handleAddToCart}
                 handleDelete={handleDelete}
                

            />
            }/>

           
        </Routes>

          
      </div>
    
  )
}

export default App