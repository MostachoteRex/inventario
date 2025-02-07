import React, { useState, useEffect } from 'react';

const ProductForm = ({ onAddProduct, onUpdateProduct, productToEdit }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name);
      setDescription(productToEdit.description);
      setQuantity(productToEdit.quantity);
      setPrice(productToEdit.price);
    } else {
      setName('');
      setDescription('');
      setQuantity('');
      setPrice('');
    }
  }, [productToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const product = { name, description, quantity, price };
    if (productToEdit) {
      onUpdateProduct({ ...productToEdit, ...product });
    } else {
      onAddProduct(product);
    }
    setName('');
    setDescription('');
    setQuantity('');
    setPrice('');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-gray-50 shadow-md rounded-lg border border-gray-300 mt-6">
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
        {productToEdit ? 'Editar Producto' : 'Agregar Producto'}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
        <input
          type="text"
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
        <input
          type="number"
          placeholder="Cantidad"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
        <input
          type="number"
          placeholder="Precio"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-md shadow-md mt-4 transition duration-300"
      >
        {productToEdit ? 'Actualizar Producto' : 'Agregar Producto'}
      </button>
    </form>
  );
};

export default ProductForm;
