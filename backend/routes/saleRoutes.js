import express from 'express';
import Sale from '../models/Sale.js';
import Product from '../models/Product.js';

const router = express.Router();

// Registrar una nueva venta
router.post('/', async (req, res) => {
  const { products } = req.body;

  try {
    let total = 0;

    // Verificar el stock y calcular el total
    for (const item of products) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ error: `Producto no encontrado: ${item.product}` });
      }
      if (product.quantity < item.quantity) {
        return res.status(400).json({ error: `Stock insuficiente para el producto: ${product.name}` });
      }
      total += item.price * item.quantity; // Usar el precio modificado
    }

    // Actualizar el stock de los productos
    for (const item of products) {
      await Product.findByIdAndUpdate(item.product, { $inc: { quantity: -item.quantity } });
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