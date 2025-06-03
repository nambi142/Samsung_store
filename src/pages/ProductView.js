import "../css/Productview.css";
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import  { useContext } from 'react';
import { StoreContext } from '../context/Store';
import axios from 'axios';
const ProductView = () => {
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;;
  const { addToCart } = useContext(StoreContext);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const { category, id } = useParams(); 
  
  useEffect(() => {
    axios
      .get(`${BASE_URL}/${category}/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((err) => {
        setError("Failed to fetch product details");
        console.error(err);
      });
  }, [BASE_URL,category, id]);

  if (error) return <p>{error}</p>;
  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-view">
      <img src={product.image} alt={product.name} className="product-view-img" />
      <div className="product-view-details">
        <h2>{product.name}</h2>
        <p className="product-view-price">Price: ${product.price}</p>
        <p className="product-view-description">{product.description}</p>
        <button className="addtocart"
        onClick={() => addToCart(product)}
        >Add To Cart</button>
      </div>
    </div>
  );
};

export default ProductView;
