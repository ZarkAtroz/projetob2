// supplierService.js
import api from './api';
import '../styles/supplierStyles.css';

// Fetch all suppliers
export const fetchSuppliers = async (token) => {
  try {
    const response = await api.get('/suppliers', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch suppliers:', error);
    throw error;
  }
};

// Create a new supplier
export const createSupplier = async (supplierData, token) => {
  try {
    const response = await api.post('/suppliers', supplierData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to create supplier:', error);
    throw error;
  }
};

// Update supplier
export const updateSupplier = async (supplierId, updatedData, token) => {
  try {
    const response = await api.put(`/suppliers/${supplierId}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to update supplier:', error);
    throw error;
  }
};

// Delete supplier
export const deleteSupplier = async (supplierId, token) => {
  try {
    await api.delete(`/suppliers/${supplierId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (error) {
    console.error('Failed to delete supplier:', error);
    throw error;
  }
};