// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { useContext } from 'react'
// 1. Import cái này vào
import { BrowserRouter } from 'react-router-dom' 

import App from './App.jsx'
import { ShopProvider } from './ShopContext.jsx'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2. Bọc App lại như thế này */}

    
    <BrowserRouter>
    <ShopProvider>
         <App></App>
    </ShopProvider>
      
    </BrowserRouter>
  </React.StrictMode>,
)