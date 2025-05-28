import React, { useContext } from 'react';
import { BiSolidTrashAlt } from "react-icons/bi";
import { StoreContext } from '../context/Store';
import { useNavigate } from 'react-router-dom';
import '../css/Cart.css';

const Cart = () => {
  const { cart, removeFromCart, total } = useContext(StoreContext);
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      alert("Please select the item");
    } else {
      navigate("/Checkout");
    }
  };

  return (
    <div id="cart">
      <p className="mycart">My Cart</p>

      {cart.length === 0 ? (
        <div id="cartempty">Your Cart is Empty</div>
      ) : (
        <div id="details">
          {cart.map((item, index) => (
            <div className="list" key={item.id ?? index}>
              <img src={item.image} alt={item.name} className="image" />
              <div className="text">
                {item.name} (x{item.quantity ?? 1})
              </div>
              <div className="money">
                ${ (item.price * (item.quantity ?? 1)).toFixed(2) }
              </div>
              <button
                className="delete"
                onClick={() => removeFromCart(index)}
              >
                <BiSolidTrashAlt />
              </button>
            </div>
          ))}
        </div>
      )}

      <hr className="line" />

      <div className="order">
        <button className="confirm" onClick={handlePlaceOrder}>
          Checkout
        </button>
      </div>

      <div className="total">
        <p>Total</p>
        <p id="total">${total.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Cart;
