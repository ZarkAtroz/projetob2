// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/General.css';

function Navbar() {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      {isAuthenticated && (
        <>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/cart">Carrinho</Link>
          <Link to="/payments">Pagamentos</Link>
          <Link to="/products">Produtos</Link>
          <Link to="/shop">Loja</Link>
          <Link to="/suppliers">Fornecedores</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
      {!isAuthenticated && (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Registrar</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;