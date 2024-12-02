// src/components/products/Products.js
import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import '../../styles/products/Products.css';

function Products() {
  const [newProduct, setNewProduct] = useState({ nome: '', descricao: '', preco: '', estoque: '' });
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  // Função fetchProducts movida para fora do useEffect
  async function fetchProducts() {
    try {
      const response = await api.get('/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await api.put(`/products/${editingProduct.id}`, newProduct);
        alert('Produto atualizado com sucesso!');
      } else {
        await api.post('/products', newProduct);
        alert('Produto adicionado com sucesso!');
      }
      setNewProduct({ nome: '', descricao: '', preco: '', estoque: '' });
      setEditingProduct(null);
      await fetchProducts(); // Agora é possível chamar a função aqui
    } catch (error) {
      console.error('Erro ao adicionar/atualizar produto:', error);
      alert('Erro ao adicionar/atualizar produto. Tente novamente.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleEditProduct = (product) => {
    setNewProduct(product);
    setEditingProduct(product);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await api.delete(`/products/${productId}`);
      alert('Produto removido com sucesso!');
      setProducts(products.filter((product) => product.id !== productId));
    } catch (error) {
      console.error('Erro ao remover produto:', error);
      alert('Erro ao remover produto. Tente novamente.');
    }
  };

  return (
    <div className="products-container">
      <h2>{editingProduct ? 'Editar Produto' : 'Adicionar Novo Produto'}</h2>
      <form className="add-product-form" onSubmit={handleAddProduct}>
        <input
          type="text"
          name="nome"
          placeholder="Nome do Produto"
          value={newProduct.nome}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="descricao"
          placeholder="Descrição"
          value={newProduct.descricao}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="preco"
          placeholder="Preço"
          value={newProduct.preco}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="estoque"
          placeholder="Estoque"
          value={newProduct.estoque}
          onChange={handleInputChange}
          required
        />
        <button type="submit">{editingProduct ? 'Atualizar Produto' : 'Adicionar Produto'}</button>
      </form>

      <h2>Lista de Produtos</h2>
      <table className="products-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Preço</th>
            <th>Estoque</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.nome}</td>
              <td>{product.descricao}</td>
              <td>R$ {product.preco}</td>
              <td>{product.estoque}</td>
              <td>
                <button onClick={() => handleEditProduct(product)}>Editar</button>
                <button onClick={() => handleDeleteProduct(product.id)}>Remover</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Products;
