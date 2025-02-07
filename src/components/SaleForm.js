import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SaleForm = ({ onSaleCompleted }) => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [total, setTotal] = useState(0);

  // Obtener la lista de productos
  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error(error));
  }, []);

  // Manejar la selección de productos
  const handleProductChange = (productId, quantity) => {
    const product = products.find(p => p._id === productId);
    if (!product) return;

    const updatedSelection = selectedProducts.filter(item => item.product !== productId);
    if (quantity > 0) {
      updatedSelection.push({ product: productId, quantity });
    }

    setSelectedProducts(updatedSelection);

    // Calcular el total
    const newTotal = updatedSelection.reduce((sum, item) => {
      const product = products.find(p => p._id === item.product);
      return sum + (product.price * item.quantity);
    }, 0);
    setTotal(newTotal);
  };

  // Registrar la venta
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/sales', { products: selectedProducts });
      onSaleCompleted(response.data);
      setSelectedProducts([]);
      setTotal(0);
      alert('Venta registrada exitosamente');
    } catch (error) {
      console.error(error);
      alert('Error al registrar la venta');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <h2 className="text-xl font-bold mb-4">Registrar Venta</h2>
      {products.map(product => (
        <div key={product._id} className="mb-4">
          <label className="block mb-2">
            {product.name} (Stock: {product.quantity})
            <input
              type="number"
              min="0"
              max={product.quantity}
              onChange={(e) => handleProductChange(product._id, parseInt(e.target.value))}
              className="ml-2 p-1 border rounded"
            />
          </label>
        </div>
      ))}
      <div className="font-bold mb-4">Total: ${total.toFixed(2)}</div>
      <button type="submit" className="bg-green-500 text-white p-2 rounded">
        Registrar Venta
      </button>
    </form>
  );
};

export default SaleForm;