import React from 'react';

const ProductList = ({ products, onDeleteProduct, onUpdateProduct }) => {
  return (
    <div className="space-y-4">
      {products.map((product) => (
        <div key={product._id} className="p-4 border rounded">
          <h3 className="font-bold">{product.name}</h3>
          <p>{product.description}</p>
          <p>Cantidad: {product.quantity}</p>
          <p>Precio: ${product.price}</p>
          <button
            onClick={() => onDeleteProduct(product._id)}
            className="bg-red-500 text-white p-2 rounded mr-2"
          >
            Eliminar
          </button>
          <button
            onClick={() => onUpdateProduct(product._id)}
            className="bg-yellow-500 text-white p-2 rounded"
          >
            Actualizar
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;