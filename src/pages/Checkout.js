import React, { useContext, useState } from 'react';
import { StoreContext } from "../context/Store";
import { useNavigate } from 'react-router-dom';
import "../css/Checkout.css";

const Checkout = () => {
  const {  isLoggedIn } = useContext(StoreContext);
  const navigate = useNavigate();

  // Local state for form inputs
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    address: '',
  });

  // Update state on input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Form validation and submission
  const handleSubmit = () => {
    const { name, mobile, address } = formData;
    const mobileRegex = /^[6-9]\d{9}$/;

    if (!name || !mobile || !address) {
      alert("Please enter the name, mobile no, address");
      return;
    }

    if (!mobileRegex.test(mobile)) {
      alert("Please enter a valid 10-digit Indian mobile number");
      return;
    }

   if (isLoggedIn) {
    navigate("/payment");  // ✅ Route to payment if logged in and form valid
  } else {
    alert("Please log in to proceed with checkout.");
    navigate("/login");   // ✅ Else send to login page
  }
  };

  return (
    <div className="checkout">
      <h1>Checkout</h1>

      <label>Name</label>
      <input
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Name"
        className="input"
        required
      />

      <label>Mobile No</label>
      <input
        type="tel"
        name="mobile"
        value={formData.mobile}
        onChange={handleInputChange}
        placeholder="10-digit mobile number"
        maxLength="10"
        pattern="[6-9]{1}[0-9]{9}"
        className="input"
        required
      />

      <label>Place</label>
      <input
        type="text"
        name="address"
        value={formData.address}
        onChange={handleInputChange}
        placeholder="Address"
        className="input"
        required
      />

      <button className="placeorder" onClick={handleSubmit}>
        Checkout
      </button>
    </div>
  );
};

export default Checkout;
