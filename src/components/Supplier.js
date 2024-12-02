// Supplier.js (Component)
import React, { useState, useEffect } from 'react';
import { fetchSuppliers, createSupplier, updateSupplier, deleteSupplier } from '../services/supplierService';
import '../styles/supplierStyles.css';

function Supplier({ token }) {
  const [suppliers, setSuppliers] = useState([]);
  const [newSupplier, setNewSupplier] = useState({ name: '', contact: '', address: '', email: '', phone: '' });
  const [editingSupplier, setEditingSupplier] = useState(null);

  useEffect(() => {
    const getSuppliers = async () => {
      try {
        const data = await fetchSuppliers(token);
        setSuppliers(data);
      } catch (error) {
        console.error('Error fetching suppliers:', error);
      }
    };
    getSuppliers();
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSupplier((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateSupplier = async () => {
    try {
      const createdSupplier = await createSupplier(newSupplier, token);
      setSuppliers((prev) => [...prev, createdSupplier]);
      setNewSupplier({ name: '', contact: '', address: '', email: '', phone: '' });
    } catch (error) {
      console.error('Error creating supplier:', error);
    }
  };

  const handleEditSupplier = (supplier) => {
    setEditingSupplier(supplier);
    setNewSupplier(supplier);
  };

  const handleUpdateSupplier = async () => {
    try {
      const updatedSupplier = await updateSupplier(editingSupplier.id, newSupplier, token);
      setSuppliers((prev) => prev.map((sup) => (sup.id === editingSupplier.id ? updatedSupplier : sup)));
      setEditingSupplier(null);
      setNewSupplier({ name: '', contact: '', address: '', email: '', phone: '' });
    } catch (error) {
      console.error('Error updating supplier:', error);
    }
  };

  const handleDeleteSupplier = async (supplierId) => {
    try {
      await deleteSupplier(supplierId, token);
      setSuppliers((prev) => prev.filter((sup) => sup.id !== supplierId));
    } catch (error) {
      console.error('Error deleting supplier:', error);
    }
  };

  return (
    <div>
      <h2>Suppliers</h2>
      <ul className="suppliers">
        {suppliers.map((supplier) => (
          <li key={supplier.id}>
            {supplier.name} - {supplier.contact} - {supplier.address} - {supplier.email} - {supplier.phone}
            <div className="supplier-buttons">
              <button onClick={() => handleEditSupplier(supplier)}>Edit</button>
              <button className="delete" onClick={() => handleDeleteSupplier(supplier.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="form-section">
        <h3>{editingSupplier ? 'Edit Supplier' : 'Add New Supplier'}</h3>
        <input
          type="text"
          name="name"
          value={newSupplier.name}
          onChange={handleInputChange}
          placeholder="Supplier Name"
        />
        <input
          type="text"
          name="contact"
          value={newSupplier.contact}
          onChange={handleInputChange}
          placeholder="Contact"
        />
        <input
          type="text"
          name="address"
          value={newSupplier.address}
          onChange={handleInputChange}
          placeholder="Address"
        />
        <input
          type="email"
          name="email"
          value={newSupplier.email}
          onChange={handleInputChange}
          placeholder="Email"
        />
        <input
          type="text"
          name="phone"
          value={newSupplier.phone}
          onChange={handleInputChange}
          placeholder="Phone"
        />
        {editingSupplier ? (
          <button onClick={handleUpdateSupplier}>Update Supplier</button>
        ) : (
          <button onClick={handleCreateSupplier}>Add Supplier</button>
        )}
      </div>
    </div>
  );
}

export default Supplier;
