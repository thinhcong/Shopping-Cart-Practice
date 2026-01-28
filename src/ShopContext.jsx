import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom' // Import Router
import './App.css'
import { supabase } from "./supabaseClient.js";
import { createContext } from 'react';
import { useContext } from 'react';

const ShopContext = createContext();
export const ShopProvider = ({ children }) => {

  
  const [productList, setProductList] = useState([]);
  const [cartList, setCartList] = useState ([]);
  
    const [user, setUser] = useState(null);
    const [admin,setAdmin] = useState(null);
    const [userInfo,setUserInfo] = useState(null);
    const [wishList,setWishList] = useState([]);


   
    

    
//// Check admin và lấy thống tin người dùng
    useEffect(() => { 
      const fetchWishList = async (userId) => {
      const { data , error } =  await supabase
        .from('wishlist')
        .select(`
      id,
      product_id,
      products (
        id,
        name,
        price,
        img
      )
    `)
        .eq('user_id', userId)
        if (error) {
    console.error(error)
    return
  }         
  const formattedData = data.map((item) => ({
    ...item,

  }))
        
          setWishList(data);
          console.log(data);
       
      }

      const checkAdmin = async (userId) => { 
        if(!userId) return ;
       const { data } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', userId)
              .single();
          
        
        setUserInfo(data);
        
      
      
        if(data.role === 'admin') {
          setAdmin(true);
    
        } else {
          setAdmin(false)
    
          
        }
    

      }
        
        const getSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
       
 if (session) {
     setUser(session.user);
     checkAdmin(session.user.id);
     fetchWishList(session.user.id,session)
 } else {
  setUser(null);
  setAdmin(null);
  setWishList([]);
 }

   
   
         
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


    ///// Fetch product list from Supabase
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
            
            // Cập nhật lại state productList 
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
  const addWishList = async (product) => {
    console.log (product);
    if(!user) {
      alert('Vui lòng đăng nhập để thêm vào danh sách yêu thích');
      return;
    }

    const alreadyInWishList = wishList.find((item) => item.id === product.id);
  try {
        if (alreadyInWishList) {

           setWishList((prev) => prev.filter((item) => item.id !== product.id));
            
            await supabase.from('wishlist')
                .delete()
                .eq('user_id', user.id)
                .eq('product_id', product.id);

                console.log("da xoa")

            
          
            
        } else {

            await supabase.from('wishlist')
                .insert({ 'user_id': user.id, 'product_id': product.id });
                console.log("da them")

            
            setWishList([...wishList, product]);
            console.log("wishList", wishList);  
        }
    } catch (error) {
        console.log("Lỗi khi cập nhật wishlist:", error);
        alert("Có lỗi xảy ra, vui lòng thử lại!");
        
    }
   


    
  }



// add WishList
const value = {
    productList,
    cartList,
    handleAddToCart,
    handleDelete,
    userInfo,
    handleLogout,
    admin,
    user,
  addWishList,
  wishList,
  
}
return (
       <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    
)
}

export const useShop = () => {
    return useContext(ShopContext);
};