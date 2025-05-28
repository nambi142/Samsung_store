import { createContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const StoreContext = createContext();

const Store = ({ children }) => {
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();
  // --- States --- //

  // Login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [profiles, setProfiles] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  //Home Slider & Showcase
  const [sliderImages, setSliderImages] = useState([]);
  const [showcase, setShowCase] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Products & Cart
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [product] = useState(null);

  // Total amount for cart
  const [total, setTotal] = useState(0);


  //Login Account
  // Login validation

  const validateEmail = (email) => {
    if (!email.trim()) {
      setErrMsg("Enter valid Email");
      emailRef.current?.focus();
      return false;
    }
    return true;
  };

  const validatePassword = (password) => {
    if (!password.trim()) {
      setErrMsg("Enter valid Password");
      passwordRef.current?.focus();
      return false;
    }
    return true;
  };

  // Login submit handler
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateEmail(email) || !validatePassword(password)) return;

  try {
    // ✅ GET: Fetch user profiles and verify credentials
    const res = await axios.get(`${BASE_URL}/Profiles`);
    const user = res.data.find(
      (p) => p.Email === email && p.Password === password
    );

    if (user) {
      setCurrentUser(user);
      setIsLoggedIn(true);
      setEmail("");
      setPassword("");
      setErrMsg("");
      alert("Login Successful");
      navigate("/Mobile");
    } else {
      setErrMsg("Account not found. Redirecting to Create Account...");
      setTimeout(() => {
        navigate("/CreateAccount");
      }, 2000); // redirect after 2 seconds
    }
  } catch (err) {
    console.error("Login error:", err);
    setErrMsg("Server error or failed login");
  }
};




  // Checkout form data
  const [user, setUser] = useState({
    name: "",
    address: "",
    mobile: "",
  });

  // --- Effects ---

  // Fetch slider images
  useEffect(() => {
    const fetchSliderImages = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/sliderImages`);
        setSliderImages(res.data);
      } catch (err) {
        console.error("Failed to fetch slider images:", err);
      }
    };
    fetchSliderImages();
  }, []);
  
  // Auto change slider
  useEffect(() => {
    if (sliderImages.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sliderImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [sliderImages.length]);

  
  // Calculate total cart amount
  useEffect(() => {
    const totalAmount = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotal(totalAmount);
  }, [cart]);

  // --- Handlers and functions ---

  // Slider controls
  const goToPrev = () =>
    setCurrentIndex((prev) =>
      prev === 0 ? sliderImages.length - 1 : prev - 1
    );
  const goToNext = () => setCurrentIndex((prev) => (prev + 1) % sliderImages.length);
  const goToSlide = (index) => setCurrentIndex(index);

  // Cart functions
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (index) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      if (updatedCart[index].quantity > 1) {
        updatedCart[index].quantity -= 1;
      } else {
        updatedCart.splice(index, 1);
      }
      return updatedCart;
    });
  };

  // Checkout form input handler
  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Checkout navigation
  const handlePlaceOrder = () => {
    if (isLoggedIn) {
      navigate("/Placeorder");
    } else {
      alert("Please Login to proceed with checkout.");
      navigate("/LogIn");
    }
  };


 
  

  return (
    <StoreContext.Provider
      value={{
        // Products & Cart
        product,
        products,
        setProducts,
        cart,
        setCart,
        addToCart,
        removeFromCart,
        total,

        // Slider & Showcase
        sliderImages,
        setSliderImages,
        currentIndex,
        setCurrentIndex,
        goToPrev,
        goToNext,
        goToSlide,
        showcase,
        setShowCase,

        // Login
        email,
        setEmail,
        password,
        setPassword,
        errMsg,
        setErrMsg,
        emailRef,
        passwordRef,
        profiles,
        setProfiles,
        isLoggedIn,
        setIsLoggedIn,
        currentUser,
        setCurrentUser,
        handleSubmit,

        // Checkout
        user,
        setUser,
        handleInput,
        handlePlaceOrder,

      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default Store;
