import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoIosAddCircle } from "react-icons/io";
import { StoreContext } from "../context/Store";
import axios from "axios";
import "../css/Products.css";

const Watches = () => {
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const { addToCart, products, setProducts, setError } =
    useContext(StoreContext);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/Watches`)      
      .then((response) => {
        setProducts(response.data || []);      
      })
      .catch((err) => {
        setError("Failed to fetch mobiles");
        console.error(err);
      });
  }, [BASE_URL,setProducts, setError]);

  if (!products) return <p>Loading...</p>;

  return (
    <div className="products">
      <ul id="gadgets">
        {products.map((product) => (
          <li key={product.id} className="product">
           <Link to={`/product/Watches/${product.id}`} className="lin">
              <img src={product.image} alt={product.name} />
              <h3 className="name">{product.name}</h3>
              <p className="amount">${product.price}</p>
            </Link>
            <button
              className="btn"
              onClick={() => addToCart(product)}     
            >
              <IoIosAddCircle />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Watches;
