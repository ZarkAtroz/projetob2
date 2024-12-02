// src/components/users/Home.js
import React, { useEffect, useState } from 'react';
import api from '../../services/api';

function Home() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const { data } = await api.get('/users/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setUserData(data);
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    }

    fetchUserData();
  }, []);

  return (
    <div className="home-container">
      <h2>Bem-vindo ao Home</h2>
      <p>Esta é a página inicial da aplicação.</p>
      {userData ? (
        <div className="user-data">
          <h3>Dados do Usuário:</h3>
          <p><strong>Nome:</strong> {userData.nome}</p>
          <p><strong>Email:</strong> {userData.email}</p>
        </div>
      ) : (
        <p>Carregando dados do usuário...</p>
      )}
    </div>
  );
}

export default Home;
