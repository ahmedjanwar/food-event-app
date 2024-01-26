const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  tableId: { type: String, required: true },
  foodItems: { type: Array, required: true },
});

module.exports = mongoose.model('Order', orderSchema);
