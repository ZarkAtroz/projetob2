// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userService from '../services/userService';
import '../styles/Login.css';
import '../styles/General.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userService.login(email, password);
      alert('Login realizado com sucesso!');
      navigate('/users');
    } catch (error) {
      alert('Erro no login: ' + (error.response?.data?.error || error.message));
    }
  };

  return (
    <div>
      <nav className="nav-bar">
        <span className="title">Landing Page</span>
        <div className="nav-links">
          <a href="/register">Criar conta</a>
          <a href="/logout">Sair</a>
        </div>
      </nav>
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Senha:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-button">Entrar</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
