// src/components/OrderForm.js
import React, { useState } from 'react';
import axios from 'axios';
import './OrderForm.css'; // Import the CSS file for styling

const OrderForm = () => {
  const [tableId, setTableId] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [highlightedItem, setHighlightedItem] = useState('');

  const handleItemSelect = (item) => {
    if (selectedItem === item) {
      // If the selected item is clicked again, deselect it
      setSelectedItem(null);
      setHighlightedItem('');
    } else {
      // Otherwise, select the clicked item
      setSelectedItem(item);
      setHighlightedItem(item);
    }
  };

  const handleTableIdChange = (e) => {
    setTableId(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      if (selectedItem) {
        // Prompt for table ID
        const enteredTableId = window.prompt('Enter Table ID:', '');
  
        // Check if the user entered a table ID
        if (enteredTableId !== null) {
          const response = await axios.post('http://localhost:3001/api/submitOrder', {
            tableId: enteredTableId,
            foodItems: [selectedItem],
          });
  
          console.log('Server Response:', response.data);
        }
      }
  
      // Clear the input values and selections
      setTableId('');
      setSelectedItem(null);
      setHighlightedItem('');
    } catch (error) {
      console.error('Error submitting order:', error);
    }
  };
  

  return (
    <div>
      <h2>Order Form</h2>
      <form>
        {/* <label>
          Table ID:
          <input type="text" value={tableId} onChange={handleTableIdChange} />
        </label> */}
        <div className="card-container">
          {/* Card for Burger */}
          <div
            className={`card ${selectedItem === 'Burger' ? 'selected' : ''}`}
            onClick={() => handleItemSelect('Burger')}
          >
            <img src="https://media.istockphoto.com/id/520410807/photo/cheeseburger.jpg?s=612x612&w=0&k=20&c=fG_OrCzR5HkJGI8RXBk76NwxxTasMb1qpTVlEM0oyg4=" alt="Burger" />
            <div>
              <h3>Burger </h3>
              <p>Description of Burger</p>
            </div>
          </div>
          {/* Card for Pizza */}
          <div
            className={`card ${selectedItem === 'Pizza' ? 'selected' : ''}`}
            onClick={() => handleItemSelect('Pizza')}
          >
            <img src="https://img.freepik.com/free-psd/freshly-baked-pizza-with-cut-slice-isolated-transparent-background_191095-9041.jpg?size=338&ext=jpg&ga=GA1.1.1448711260.1706227200&semt=sph" alt="Pizza" />
            <div>
              <h3>Pizza</h3>
              <p>Description of Pizza</p>
            </div>
          </div>
          {/* Add more cards for other items */}
        </div>
        <button type="button" onClick={handleSubmit} className="btn">
          Submit Order
        </button>
      </form>
    </div>
  );
};

export default OrderForm;
