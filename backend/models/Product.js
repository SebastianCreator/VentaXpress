const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: String,
    category: { type: String, required: true },
    price: { type: Number, required: true },
    cost: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    minStock: { type: Number, default: 5 },
    barcode: String,
    image: String,
    isActive: { type: Boolean, default: true },
    tax: { type: Number, default: 0 },
  },
  { timestamps: true }
);

productSchema.index({ code: 1, name: 1 });

module.exports = mongoose.model('Product', productSchema);
