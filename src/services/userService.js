// src/services/userService.js
import api from './api';

const userService = {
  login: async (email, password) => {
    try {
      console.log('Enviando dados para login:', { email, password }); // Log para debug
      const response = await api.post('/users/login', { email, password });
      if (response.data && response.data.Token) {
        localStorage.setItem('token', response.data.Token);
        console.log('Token armazenado:', response.data.Token); // Log para verificar
      }
      return response.data;
    } catch (error) {
      console.error('Erro na requisição de login:', error.response || error.message);
      throw error;
    }
  },

  register: async (email, data_nasc, password) => {
    try {
      console.log('Enviando dados para registro:', { email, data_nasc, password }); // Log
      const response = await api.post('/users/novouser', { email, data_nasc, password });
      return response.data;
    } catch (error) {
      console.error('Erro na requisição de registro:', error.response || error.message);
      throw error;
    }
  },

  getAllUsers: async () => {
    try {
      const response = await api.get('/users/allusers');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      throw error;
    }
  },

  getUserById: async (id) => {
    try {
      const response = await api.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar usuário por ID:', error);
      throw error;
    }
  },
};

export default userService;