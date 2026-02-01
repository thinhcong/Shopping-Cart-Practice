import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import { useShop } from "../ShopContext.jsx";
import { supabase } from "../supabaseClient.js";



function CartPage({ cartList, handleDelete, handleAddToCart }) {
  const [paymentMethod, setPaymentMethod] = useState("");
  const { userInfo,products } = useShop();

  const totalAmount = cartList.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
/// handle Checkout 
const HandleCheckout = ()=> {
  if(!paymentMethod) return alert("Vui lồng chọn phương thức thanh toán")
  if (paymentMethod === "COD"){
    handelCOD()
  }else {
    handleVnPay()
  }}
  



//ENTRY CHECKOUT 
  const handleVnPay = async () => {
   const res = await fetch("http://localhost:5000/api/payment/vnpay",{
    method:'POST',
    headers:{ 'Content-Type': 'application/json'},
    body:JSON.stringify({
      amount:totalAmount
    })
    
     
   })
   const data= await res.json();
   window.location.href=data.paymentUrl
  };

  // Create order
  const createOrder = async (method) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    

    const { data, error } = await supabase
      .from("orders")
      .insert([
        {
          user_id: user?.id || null,
          created_at: new Date().toISOString(),
          customer_name: userInfo?.full_name || "Khách lẻ",
          customer_phone: userInfo?.phone || "",
          shipping_address: userInfo?.address || "",
          items: cartList,
          total_price: totalAmount,
          payment_method: method,
          status: "pending",
          note: "",
          // items:products.brand
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return data; 
  };

  // ===== COD =====
  const  handelCOD  = async () => {
    try {
      await createOrder("cod");
      alert("Đặt hàng thành công! Thanh toán khi nhận hàng.");
    } catch (err) {
      console.error(err);
      alert("Đặt hàng thất bại");
    }
  };

  
 
  return (
    <div className="container mx-auto p-10 bg-white min-h-screen">
      {cartList.length > 0 && (
        <h1 className="text-3xl font-bold mb-8 text-center uppercase tracking-wide">
          SHOPPING CART
        </h1>
      )}

      {cartList.length === 0 ? (
        <div className="text-center">
          <p className="text-xl text-gray-500 mb-4">Giỏ hàng đang trống trơn!</p>
          <Link
            to="/"
            className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition"
          >
            Quay lại mua sắm
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
       
          <div className="grid grid-cols-5 border-b-2 border-gray-200 pb-4 font-bold text-gray-700">
            <div className="col-span-2">Sản phẩm</div>
            <div className="text-center">Đơn giá</div>
            <div className="text-center">Số lượng</div>
            <div className="text-center">Thao tác</div>
          </div>

          {cartList.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-5 items-center border-b border-gray-100 py-4 hover:bg-gray-50"
            >
              <div className="col-span-2 flex items-center gap-4">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded shadow-sm"
                />
                <div>
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  <p className="text-sm text-gray-500">Mã: #{item.id}</p>
                </div>
              </div>

              <div className="text-center font-medium">
                {item.price.toLocaleString()} ₫
              </div>

              <div className="text-center">
                <span className="bg-gray-200 px-3 py-1 rounded">
                  x {item.quantity}
                </span>
              </div>

              <div className="flex justify-center gap-4">
                <button onClick={() => handleDelete(item)} className="font-bold">
                  -
                </button>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="font-bold"
                >
                  +
                </button>
              </div>
            </div>
          ))}

       
          <div className="mt-10 space-y-4">
            <h2 className="text-xl font-bold">Phương thức thanh toán</h2>

            <div
              onClick={() => setPaymentMethod("COD")}
              className={`flex items-center gap-3 p-4 border rounded cursor-pointer
              ${paymentMethod === "COD" ? "border-black" : "border-gray-300"}`}
            >
              <span className="text-2xl">💵</span>
              <p className="font-semibold">Thanh toán khi nhận hàng (COD)</p>
            </div>

            <div
              onClick={() => setPaymentMethod("VNPAY")}
              className={`flex items-center gap-3 p-4 border rounded cursor-pointer
              ${paymentMethod === "VNPAY" ? "border-pink-500" : "border-gray-300"}`}
            >
              <img
                src="https://vinadesign.vn/uploads/images/2023/05/vnpay-logo-vinadesign-25-12-57-55.jpg"
                alt="VNPAYN"
                className="w-10 h-10"
              />
              <p className="font-semibold text-pink-600">Thanh toán VN PAY</p>
            </div>
          </div>

        
          <div className="flex justify-end mt-8 items-center gap-6">
            <div className="text-2xl font-bold">
              Tổng cộng:
              <span className="text-red-600 ml-2">
                {totalAmount.toLocaleString()} ₫
              </span>
            </div>
             <button
              onClick={HandleCheckout}
              className="bg-black text-white text-lg px-8 py-3 rounded"
            >
              Xác nhận thanh toán
            </button>
            
            
          </div>
        </div>
      )}
    </div>
  );

}  
export default CartPage;
