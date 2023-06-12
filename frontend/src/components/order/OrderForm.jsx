import React, { useState } from 'react';
import './index.css';
import apiService from '../../services/apiService';
import Cookies from 'js-cookie';

const OrderForm = () => {
  const [symbol, setSymbol] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await apiService.placeOrder(Cookies.get('token'),symbol,price,quantity);
      console.log('Order placed:', response);

      // Reset the form fields
      setSymbol('');
      setQuantity('');
      setPrice('');
    } catch (error) {
      console.log('Error placing order:', error);
    }
  };

  return (
    <div className="order-form">
      <h2>Place Order</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Symbol:
          <input type="text" value={symbol} onChange={(e) => setSymbol(e.target.value)} />
        </label>
        <label>
          Quantity:
          <input type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        </label>
        <label>
          Price:
          <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
        </label>
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default OrderForm;
