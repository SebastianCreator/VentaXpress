const express = require('express');
const Sale = require('../models/Sale');
const Product = require('../models/Product');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.post('/', authenticate, async (req, res) => {
  try {
    const { items, discount, paymentMethod, notes } = req.body;
    
    let subtotal = 0;
    let totalTax = 0;
    const updatedItems = [];

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) return res.status(404).json({ message: `Producto ${item.product} no encontrado` });

      const quantity = Number(item.quantity);
      if (!Number.isFinite(quantity) || quantity <= 0) {
        return res.status(400).json({ message: 'Cantidad inválida' });
      }

      if (product.stock < quantity) {
        return res.status(400).json({
          message: `Stock insuficiente para ${product.name}. Disponible: ${product.stock}, solicitado: ${quantity}`
        });
      }

      const itemSubtotal = quantity * product.price;
      const itemTax = itemSubtotal * (product.tax / 100);

      updatedItems.push({
        product: item.product,
        quantity,
        unitPrice: product.price,
        subtotal: itemSubtotal,
        tax: itemTax
      });

      subtotal += itemSubtotal;
      totalTax += itemTax;

      product.stock -= quantity;
      await product.save();
    }

    const sale = new Sale({
      saleNumber: `SALE-${Date.now()}`,
      cashier: req.user.id,
      items: updatedItems,
      subtotal,
      tax: totalTax,
      discount: discount || 0,
      total: subtotal + totalTax - (discount || 0),
      paymentMethod,
      notes
    });

    await sale.save();
    await sale.populate('cashier items.product');
    
    res.status(201).json(sale);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/', authenticate, async (req, res) => {
  try {
    const { startDate, endDate, cashier } = req.query;
    const filter = {};
    
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) filter.createdAt.$lte = new Date(endDate);
    }
    if (cashier) filter.cashier = cashier;

    const sales = await Sale.find(filter).populate('cashier items.product').sort({ createdAt: -1 });
    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', authenticate, async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id).populate('cashier items.product');
    if (!sale) return res.status(404).json({ message: 'Venta no encontrada' });
    res.json(sale);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
