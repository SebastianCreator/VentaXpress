const express = require('express');
const Product = require('../models/Product');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', authenticate, async (req, res) => {
  try {
    const products = await Product.find({});
    const lowStock = products.filter(p => p.stock <= p.minStock);
    res.json({ total: products.length, lowStock: lowStock.length, products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/adjust/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { quantity, reason } = req.body;
    const product = await Product.findById(req.params.id);
    
    product.stock += quantity;
    await product.save();
    
    res.json({ message: 'Inventario ajustado', product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
