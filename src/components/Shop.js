// src/components/Shop.js
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import '../styles/products/Products.css';
import { useNavigate } from 'react-router-dom';

function Shop() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.warn('Token não encontrado, redirecionando para login.');
          navigate('/login');
          return;
        }
        console.log('Token encontrado:', token);
        const { data } = await api.get('/products', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('Produtos recebidos do backend:', data);
        setProducts(data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        if (error.response && error.response.status === 401) {
          console.warn('Erro 401, redirecionando para login.');
          navigate('/login');
        }
      }
    }
    fetchProducts();
  }, [navigate]);

  const handleAddToCart = async (productId) => {
    try {
      await api.post(`/cart/add-item`, { productId, quantidade: 1 }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      alert('Produto adicionado ao carrinho!');
    } catch (error) {
      console.error('Erro ao adicionar produto ao carrinho:', error);
      alert('Erro ao adicionar ao carrinho. Tente novamente.');
    }
  };

  return (
    <div className="shop-container">
      <h1>Loja</h1>
      <div className="products-list">
        {products.length === 0 ? (
          <p>Nenhum produto disponível.</p>
        ) : (
          products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-card-content">
                <h3>{product.nome}</h3>
                <p>{product.descricao}</p>
                <p><strong>Preço:</strong> R$ {product.preco}</p>
                <button onClick={() => handleAddToCart(product.id)}>Adicionar ao Carrinho</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Shop;