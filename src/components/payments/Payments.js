// src/components/payments/Payments.js
import React, { useState } from 'react';
import api from '../../services/api';
import '../../styles/payments/Payments.css';

function Payments() {
  const [paymentDetails, setPaymentDetails] = useState({ cardNumber: '', expiryDate: '', cvv: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails({ ...paymentDetails, [name]: value });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/payments', paymentDetails);
      alert('Pagamento realizado com sucesso!');
      console.log('Detalhes da transação:', response.data);
    } catch (error) {
      console.error('Erro ao processar pagamento:', error);
      alert('Erro ao processar pagamento. Tente novamente.');
    }
  };

  return (
    <div className="payments-container">
      <h2>Pagamento</h2>
      <form onSubmit={handlePayment}>
        <input
          type="text"
          name="cardNumber"
          placeholder="Número do Cartão"
          value={paymentDetails.cardNumber}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="expiryDate"
          placeholder="Data de Validade (MM/AA)"
          value={paymentDetails.expiryDate}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="cvv"
          placeholder="CVV"
          value={paymentDetails.cvv}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Pagar</button>
      </form>
    </div>
  );
}

export default Payments;
