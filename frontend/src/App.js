import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import SaleForm from './components/SaleForm';

const App = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAddProduct = async (product) => {
    try {
      const response = await axios.post('http://localhost:5000/api/products', product);
      setProducts([...products, response.data]);
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Error al agregar el producto');
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error al eliminar el producto');
    }
  };

  const handleUpdateProduct = async (id) => {
    try {
      const updatedProduct = { name: 'Updated Name', description: 'Updated Description', quantity: 10, price: 20 };
      const response = await axios.put(`http://localhost:5000/api/products/${id}`, updatedProduct);
      setProducts(products.map((product) => (product._id === id ? response.data : product)));
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Error al actualizar el producto');
    }
  };

  const handleSaleCompleted = async () => {
    try {
      await fetchProducts();
      alert('Venta registrada exitosamente');
    } catch (error) {
      console.error('Error updating products after sale:', error);
      alert('Error al actualizar el inventario después de la venta');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <br></br>
              {products.length === 0 ? (
                <p className="text-gray-500">No hay productos registrados.</p>
              ) : (
                <ProductList
                  products={products}
                  onDeleteProduct={handleDeleteProduct}
                  onUpdateProduct={handleUpdateProduct}
                />
              )}
            </>
          }
        />
        <Route
          path="/ventas"
          element={
            <>
              <SaleForm onSaleCompleted={handleSaleCompleted} />
            </>
          }
        />
        <Route
          path="/inventario"
          element={<ProductList products={products} onDeleteProduct={handleDeleteProduct} onUpdateProduct={handleUpdateProduct} />}
        />
        <Route
          path="/actualizar"
          element={<ProductForm onAddProduct={handleAddProduct} />}
        />
      </Routes>
    </div>
  );
};

export default App;
