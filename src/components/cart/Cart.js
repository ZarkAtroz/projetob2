// src/components/cart/Cart.js
import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import '../../styles/cart/Cart.css';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState('0.00');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCartItems() {
      try {
        const { data } = await api.get('/cart', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        console.log('Itens do carrinho:', data);
        const items = Array.isArray(data.itens) ? data.itens : [];
        setCartItems(items);
        const total = items.reduce((acc, item) => acc + parseFloat(item.precoTotal), 0).toFixed(2);
        setTotalPrice(total);
      } catch (error) {
        console.error('Erro ao buscar itens do carrinho:', error);
      }
    }

    fetchCartItems();
  }, []);

  const handleRemoveFromCart = async (productId) => {
    try {
      await api.delete(`/cart/remove-item/${productId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      alert('Produto removido do carrinho!');
      setCartItems((prevItems) => prevItems.filter((item) => item.productId !== productId));
      setTotalPrice((prevTotal) => {
        const removedItem = cartItems.find((item) => item.productId === productId);
        return (prevTotal - parseFloat(removedItem.precoTotal)).toFixed(2);
      });
    } catch (error) {
      console.error('Erro ao remover produto do carrinho:', error);
      alert('Erro ao remover do carrinho. Tente novamente.');
    }
  };

  const handleQuantityChange = async (itemId, newQuantity) => {
    try {
      await api.put(`/cart/update-item/${itemId}`, { quantidade: newQuantity }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === itemId ? { ...item, quantidade: newQuantity, precoTotal: (item.product.preco * newQuantity).toFixed(2) } : item
        )
      );
      const updatedTotal = cartItems.reduce((acc, item) => acc + parseFloat(item.precoTotal), 0).toFixed(2);
      setTotalPrice(updatedTotal);
    } catch (error) {
      console.error('Erro ao atualizar quantidade do produto:', error);
      alert('Erro ao atualizar a quantidade. Tente novamente.');
    }
  };

  const handleProceedToPayment = () => {
    navigate('/payments');
  };

  return (
    <div className="cart-container">
      <h1>Meu Carrinho</h1>
      {cartItems.length === 0 ? (
        <p>Nenhum item no carrinho.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <h3>{item.product.nome}</h3>
              <p>Quantidade: 
                <input
                  type="number"
                  value={item.quantidade}
                  min="1"
                  onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                />
              </p>
              <p>Preço Total: R$ {item.precoTotal}</p>
              <button onClick={() => handleRemoveFromCart(item.productId)}>Remover</button>
            </div>
          ))}
          <div className="cart-total">
            <h2>Total: R$ {totalPrice}</h2>
          </div>
          <button className="proceed-to-payment" onClick={handleProceedToPayment}>Ir para Pagamento</button>
        </>
      )}
    </div>
  );
}

export default Cart;
