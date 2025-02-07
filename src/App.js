import React, { useState, useEffect } from 'react';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import SaleForm from './components/SaleForm';
import axios from 'axios';

const App = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await axios.get('http://localhost:5000/api/products');
    setProducts(response.data);
  };

  const handleAddProduct = async (product) => {
    const response = await axios.post('http://localhost:5000/api/products', product);
    setProducts([...products, response.data]);
  };

  const handleDeleteProduct = async (id) => {
    await axios.delete(`http://localhost:5000/api/products/${id}`);
    setProducts(products.filter((product) => product._id !== id));
  };

  const handleUpdateProduct = async (id) => {
    const updatedProduct = { name: 'Updated Name', description: 'Updated Description', quantity: 10, price: 20 };
    const response = await axios.put(`http://localhost:5000/api/products/${id}`, updatedProduct);
    setProducts(products.map((product) => (product._id === id ? response.data : product)));
  };

  // Actualizar la lista de productos después de una venta
  const handleSaleCompleted = () => {
    fetchProducts();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Inventario Milena Jaimes Hair</h1>
      <ProductForm onAddProduct={handleAddProduct} />
      <ProductList
        products={products}
        onDeleteProduct={handleDeleteProduct}
        onUpdateProduct={handleUpdateProduct}
      />
      <SaleForm onSaleCompleted={handleSaleCompleted} />
    </div>
  );
};

export default App;