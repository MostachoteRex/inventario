import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SaleForm = ({ productos, onSaleCompleted }) => {
  // const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [total, setTotal] = useState(0);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const { data } = await axios.get('http://localhost:5000/api/products');
  //       setProducts(data);
  //     } catch (error) {
  //       console.error('Error fetching products:', error);
  //     }
  //   };
  //   fetchProducts();
  // }, []);

  const handleProductChange = (productId, quantity) => {
    const product = productos.find(p => p._id === productId);
    if (!product) return;

    const updatedSelection = selectedProducts.filter(item => item.product !== productId);
    if (quantity > 0) {
      updatedSelection.push({ product: productId, quantity });
    }

    setSelectedProducts(updatedSelection);
    calculateTotal(updatedSelection);
  };

  const calculateTotal = (selection) => {
    const newTotal = selection.reduce((sum, item) => {
      const product = productos.find(p => p._id === item.product);
      return sum + (product.price * item.quantity);
    }, 0);
    setTotal(newTotal);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5000/api/sales', { products: selectedProducts });
      onSaleCompleted(data);
      setSelectedProducts([]);
      setTotal(0);
      alert('Venta registrada exitosamente');
    } catch (error) {
      console.error('Error al registrar la venta:', error);
      alert('Error al registrar la venta');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Registrar Venta</h2>
      {productos.map(product => (
        <div key={product._id} className="mb-5">
          <label className="block text-lg font-medium text-gray-700 mb-1">
            {product.name} <span className="text-sm text-gray-500">(Stock: {product.quantity})</span>
          </label>
          <input
            type="number"
            min="0"
            max={product.quantity}
            onChange={(e) => handleProductChange(product._id, parseInt(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
            placeholder="Cantidad"
          />
        </div>
      ))}
      <div className="text-xl font-semibold text-center text-indigo-600 my-4">
        Total: ${total.toFixed(2)}
      </div>
      <button
        type="submit"
        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-md shadow-md transition duration-300"
      >
        Registrar Venta
      </button>
    </form>
  );
};

export default SaleForm;
