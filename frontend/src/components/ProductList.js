import React from 'react';

const ProductList = ({ products, onDeleteProduct, onUpdateProduct }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {products.map((product) => (
        <div key={product._id} className="p-4 border rounded-xl shadow-md bg-white hover:shadow-lg transition duration-300">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{product.name}</h3>
          <p className="text-gray-600 mb-1">{product.description}</p>
          <p className="text-gray-700 font-medium">Cantidad: {product.quantity}</p>
          <p className="text-gray-700 font-medium">Precio: ${product.price}</p>

          <div className="flex justify-between mt-4">
            <button
              onClick={() => onDeleteProduct(product._id)}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300"
            >
              Eliminar
            </button>
            <button
              onClick={() => onUpdateProduct(product)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-300"
            >
              Actualizar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;