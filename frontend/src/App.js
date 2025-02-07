import React, { useState, useEffect } from 'react';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import SaleForm from './components/SaleForm';
import axios from 'axios';

const App = () => {
  const [products, setProducts] = useState([]);
  const [productToEdit, setProductToEdit] = useState(null);

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

  const handleUpdateProduct = async (producto) => {
    const response = await axios.put(`http://localhost:5000/api/products/${producto._id}`, producto);
    setProducts(products.map((product) => (product._id === producto._id ? response.data : product)));
    setProductToEdit(null);
  };

  const handleSaleCompleted = () => {
    fetchProducts();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-center  mb-8">Inventario Milena Jaimes Hair</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <ProductForm 
              onAddProduct={handleAddProduct} 
              onUpdateProduct={handleUpdateProduct} 
              productToEdit={productToEdit} 
            />
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <SaleForm productos={products} onSaleCompleted={handleSaleCompleted} />
          </div>
        </div>

        <div className="bg-white mt-8 p-6 rounded-xl shadow-lg border border-gray-200">

          <ProductList
            products={products}
            onDeleteProduct={handleDeleteProduct}
            onUpdateProduct={setProductToEdit}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
