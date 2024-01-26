const express = require('express');
const router = express.Router();
const Order = require('../models/order');

// Handle both GET and POST requests
router.route('/submitOrder')
  .get((req, res) => {
    // Handle GET request if needed
    res.status(200).json({ message: 'GET request to submitOrder endpoint' });
  })
  .post(async (req, res) => {
    // Handle POST request
    try {
      const { tableId, foodItems } = req.body;
      const order = new Order({ tableId, foodItems });
      await order.save();
      res.status(200).json({ success: true, order });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  });

// New route to get the list of orders
router.get('/orders', async (req, res) => {
    try {
      const orders = await Order.find().maxTimeMS(30000); // Set the timeout to 30 seconds
      res.status(200).json({ success: true, orders });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  });
  

module.exports = router;
