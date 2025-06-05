import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoIosAddCircle } from "react-icons/io";
import { StoreContext } from "../context/Store";
import axios from "axios";
import "../css/Products.css";

const Mobiles = () => {
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const { addToCart, products, setProducts, setErrMsg } =
    useContext(StoreContext);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/Mobiles`)      
      .then((response) => {
        setProducts(response.data || []);      
      })
      .catch((err) => {
        setErrMsg("Failed to fetch mobiles");
        console.error(err);
      });
  }, [BASE_URL,setProducts, setErrMsg]);

  if (!products) return <p>Loading...</p>;

  return (
    <div className="products">
      <ul id="gadgets">
        {products.map((product) => (
          <li key={product.id} className="product">
           <Link to={`/product/Mobiles/${product.id}`} className="lin">
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

export default Mobiles;
