const express = require('express');
const app = express();
const cors = require('cors');

const PORT = 3001;

let orders = [];

app.use(cors()); // Enable CORS for all routes
app.use(express.json());

app.post('/api/submitOrder', (req, res) => {
  try {
    const { tableId, foodItems } = req.body;
    const order = { tableId, foodItems };
    orders.push(order);
    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

app.get('/api/getOrders', (req, res) => {
  res.status(200).json({ success: true, orders });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
