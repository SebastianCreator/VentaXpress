const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema(
  {
    saleNumber: { type: String, unique: true, required: true },
    cashier: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: Number,
        unitPrice: Number,
        subtotal: Number,
        tax: Number,
      }
    ],
    subtotal: { type: Number, required: true },
    tax: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    total: { type: Number, required: true },
    paymentMethod: { type: String, enum: ['cash', 'card', 'check'], default: 'cash' },
    notes: String,
    status: { type: String, enum: ['completed', 'cancelled'], default: 'completed' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Sale', saleSchema);
