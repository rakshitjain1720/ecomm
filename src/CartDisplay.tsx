import { useState } from 'react';

const CartDisplay = ({ cartItems }) => {
  return (
    <div>
      <h2>Shopping Cart</h2>
      {cartItems.map((item) => (
        <div key={item.id} className="cart-item">
          <img src={item.image} alt={item.title} />
          <div>
            <h4>{item.title}</h4>
            <p>${item.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartDisplay;
