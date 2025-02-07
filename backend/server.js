import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import productRoutes from './routes/productRoutes.js';
import saleRoutes from './routes/saleRoutes.js';

import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const MONGO_DATABASE = process.env.MONGO_DB;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/sales', saleRoutes);

// Conexión a MongoDB
await mongoose.connect(MONGO_URI, {
  dbName: MONGO_DATABASE
})
  .then(() => console.log('Connected!'));
console.log("✅ Conexión exitosa a MongoDB");


// Iniciar servidor
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));