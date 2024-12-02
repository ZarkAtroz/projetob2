// src/App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/users/Home';
import Dashboard from './components/users/Dashboard';
import Login from './components/users/Login';
import Register from './components/users/Register';
import Cart from './components/cart/Cart';
import Payments from './components/payments/Payments';
import Products from './components/products/Products';
import Shop from './components/Shop';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Supplier from './components/Supplier';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path="/suppliers" element={<Supplier />} />
        <Route path="/payments" element={<ProtectedRoute><Payments /></ProtectedRoute>} />
        <Route path="/products" element={<Products />} />
        <Route path="/shop" element={<Shop />} />
      </Routes>
    </div>
  );
}

export default App;
