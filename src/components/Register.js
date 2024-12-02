// src/components/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userService from '../services/userService';
import '../styles/Register.css';
import '../styles/General.css';

function Register() {
  const [email, setEmail] = useState('');
  const [dataNasc, setDataNasc] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userService.register(email, dataNasc, password);
      alert('Usuário registrado com sucesso!');
      navigate('/login');
    } catch (error) {
      alert('Erro no registro: ' + (error.response?.data?.error || error.message));
    }
  };

  return (
    <div>
      <nav className="nav-bar">
        <span className="title">Landing Page</span>
        <div className="nav-links">
          <a href="/login">Login</a>
          <a href="/logout">Sair</a>
        </div>
      </nav>
      <div className="form-container">
        <h2>Crie sua conta de usuário</h2>
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
            <label>Data de Nascimento:</label>
            <input
              type="date"
              value={dataNasc}
              onChange={(e) => setDataNasc(e.target.value)}
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
          <button type="submit" className="submit-button">Registrar</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
