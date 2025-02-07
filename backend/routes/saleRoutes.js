import express from 'express';
import Sale from '../models/Sale.js';
import Product from '../models/Product.js';
import mongoose from 'mongoose';

const router = express.Router();

// Registrar una nueva venta
router.post('/', async (req, res) => {
  const { products } = req.body;

  if (!Array.isArray(products) || products.length === 0) {
    return res.status(400).json({ error: 'Debes proporcionar una lista de productos.' });
  }

  try {
    let total = 0;

    // Verificar el stock y calcular el total
    for (const item of products) {
      if (!item.product || !item.quantity || item.quantity <= 0) {
        return res.status(400).json({ error: `Datos inválidos para el producto: ${JSON.stringify(item)}` });
      }

      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ error: `Producto no encontrado: ${item.product}` });
      }

      if (product.quantity < item.quantity) {
        return res.status(400).json({ error: `Stock insuficiente para el producto: ${product.name}` });
      }

      total += product.price * item.quantity; // Calcular el total con el precio real
    }

    // Actualizar el stock de los productos
    for (const item of products) {
      const updateResult = await Product.findOneAndUpdate(
        { _id: item.product, quantity: { $gte: item.quantity } },
        { $inc: { quantity: -item.quantity } },
        { new: true }
      );

      if (!updateResult) {
        return res.status(400).json({ error: `Error al actualizar el stock para el producto: ${item.product}` });
      }
    }

    // Crear la venta
    const newSale = new Sale({ products, total });
    await newSale.save();

    res.status(201).json(newSale);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Obtener todas las ventas
router.get('/', async (req, res) => {
  try {
    const sales = await Sale.find().populate('products.product');
    res.json(sales);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;