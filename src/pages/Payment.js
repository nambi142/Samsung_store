import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Payment.css";

const Payment = () => {
  const [selectedMethod, setSelectedMethod] = useState("");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    name: "",
  });

  const navigate = useNavigate();

  const handlePayment = () => {
    if (!selectedMethod) {
      alert("Please select a payment method");
      return;
    }

    if (selectedMethod === "Credit/Debit Card") {
      const { cardNumber, expiry, cvv, name } = cardDetails;
      if (!cardNumber || !expiry || !cvv || !name) {
        alert("Please fill all credit/debit card details");
        return;
      }
    }

    alert(`You selected ${selectedMethod}. Payment Successful!`);
    navigate("/Placeorder");
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="payment">
      <h1>Select Payment Method</h1>
      <div className="payment-method">
        <label>
          <input
            type="radio"
            name="payment"
            value="Google Pay"
            onChange={(e) => setSelectedMethod(e.target.value)}
          />
          Google Pay (GPay)
        </label>

        {selectedMethod === "Google Pay" && (
          <div className="qr-section">
            <p>Scan this QR code:</p>
            <img
              src="/img/scanner.jpg"
              alt="Google Pay QR"
              className="qr-image"
            />
          </div>
        )}

        <label>
          <input
            type="radio"
            name="payment"
            value="Credit/Debit Card"
            onChange={(e) => setSelectedMethod(e.target.value)}
          />
          Credit / Debit Card
        </label>

        {selectedMethod === "Credit/Debit Card" && (
          <div className="card-section">
            <input
              type="text"
              name="cardNumber"
              placeholder="Card Number"
              maxLength="16"
              value={cardDetails.cardNumber}
              onChange={handleCardChange}
              className="input"
            />
            <input
              type="text"
              name="expiry"
              placeholder="MM/YY"
              maxLength="5"
              value={cardDetails.expiry}
              onChange={handleCardChange}
              className="input"
            />
            <input
              type="text"
              name="cvv"
              placeholder="CVV"
              maxLength="3"
              value={cardDetails.cvv}
              onChange={handleCardChange}
              className="input"
            />
            <input
              type="text"
              name="name"
              placeholder="Cardholder Name"
              value={cardDetails.name}
              onChange={handleCardChange}
              className="input"
            />
          </div>
        )}
      </div>

      <button className="confirm-button" onClick={handlePayment}>
        Pay Now
      </button>
    </div>
  );
};

export default Payment;
