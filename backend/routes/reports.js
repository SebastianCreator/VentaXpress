const express = require('express');
const Sale = require('../models/Sale');
const Product = require('../models/Product');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/sales-summary', authenticate, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const filter = {};
    
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) filter.createdAt.$lte = new Date(endDate);
    }

    const sales = await Sale.find(filter);
    const summary = {
      totalSales: sales.length,
      totalRevenue: sales.reduce((sum, s) => sum + s.total, 0),
      totalTax: sales.reduce((sum, s) => sum + s.tax, 0),
      totalDiscount: sales.reduce((sum, s) => sum + s.discount, 0),
      averageTicket: sales.length > 0 ? sales.reduce((sum, s) => sum + s.total, 0) / sales.length : 0,
      paymentMethods: {}
    };

    sales.forEach(s => {
      summary.paymentMethods[s.paymentMethod] = (summary.paymentMethods[s.paymentMethod] || 0) + s.total;
    });

    res.json(summary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/top-products', authenticate, async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    const sales = await Sale.find({}).populate('items.product');
    
    const productStats = {};
    sales.forEach(sale => {
      sale.items.forEach(item => {
        if (productStats[item.product._id]) {
          productStats[item.product._id].quantity += item.quantity;
          productStats[item.product._id].revenue += item.subtotal;
        } else {
          productStats[item.product._id] = {
            name: item.product.name,
            quantity: item.quantity,
            revenue: item.subtotal
          };
        }
      });
    });

    const topProducts = Object.values(productStats)
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, limit);

    res.json(topProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
