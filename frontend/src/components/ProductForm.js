import React, { useState } from 'react';

const ProductForm = ({ onAddProduct }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddProduct({ name, description, quantity, price });
        setName('');
        setDescription('');
        setQuantity('');
        setPrice('');
    };

    return (
        <div>
            <br></br>
            <h1 className="text-xl font-bold mb-4">Registrar Productos</h1>
            <form onSubmit={handleSubmit} className="mb-6">
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="Nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="p-2 border rounded"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Descripción"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="p-2 border rounded"
                        required
                    />
                    <input
                        type="number"
                        placeholder="Cantidad"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="p-2 border rounded"
                        required
                    />
                    <input
                        type="number"
                        placeholder="Precio"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="p-2 border rounded"
                        required
                    />
                </div>
                <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">
                    Agregar Producto
                </button>
            </form>
        </div>
    );
};

export default ProductForm;