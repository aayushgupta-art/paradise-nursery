import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

function CartItem({ onContinueShopping }) {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      const costNumber = parseFloat(item.cost.replace('$', ''));
      return total + costNumber * item.quantity;
    }, 0).toFixed(2);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleCheckoutShopping = () => {
    alert('Coming Soon: Checkout functionality will be added later!');
  };

  return (
    <div className="cart-container" style={{ padding: '40px', maxWidth: '900px', margin: '0 auto' }}>
      <h2 style={{ color: '#2c3e50', marginBottom: '20px' }}>Total Shopping Cart</h2>
      
      {cart.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p style={{ fontSize: '18px', color: '#666' }}>Your cart is empty.</p>
          <button 
            onClick={onContinueShopping}
            style={{ background: '#27ae60', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', marginTop: '15px' }}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div>
          <h3 style={{ color: '#27ae60', marginBottom: '20px' }}>Total Cart Amount: </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {cart.map((item, index) => {
              const unitCost = parseFloat(item.cost.replace('$', ''));
              const totalCost = (unitCost * item.quantity).toFixed(2);
              
              return (
                <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #ddd', paddingBottom: '15px' }}>
                  <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '6px' }} />
                  <div style={{ flex: 1, marginLeft: '20px' }}>
                    <h4 style={{ margin: '0 0 5px 0' }}>{item.name}</h4>
                    <p style={{ margin: 0, color: '#666' }}>Unit Price: {item.cost}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <button onClick={() => handleDecrement(item)} style={{ padding: '5px 10px', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>-</button>
                    <span style={{ fontWeight: 'bold' }}>{item.quantity}</span>
                    <button onClick={() => handleIncrement(item)} style={{ padding: '5px 10px', background: '#27ae60', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>+</button>
                  </div>
                  <div style={{ width: '100px', textAlign: 'right', fontWeight: 'bold' }}>
                    Total: 
                  </div>
                  <button onClick={() => handleRemove(item)} style={{ marginLeft: '20px', background: '#c0392b', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
            <button 
              onClick={onContinueShopping}
              style={{ background: '#7f8c8d', color: 'white', border: 'none', padding: '12px 25px', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}
            >
              Continue Shopping
            </button>
            <button 
              onClick={handleCheckoutShopping}
              style={{ background: '#2980b9', color: 'white', border: 'none', padding: '12px 25px', borderRadius: '5px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartItem;
