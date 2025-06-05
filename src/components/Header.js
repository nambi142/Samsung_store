import React, { useContext, useState, useRef, useEffect  } from "react";
import "../css/Header.css";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineShoppingBag } from "react-icons/md";
import { SiSamsung } from "react-icons/si";
import { SlLogin, SlLogout } from "react-icons/sl";
import { StoreContext } from "../context/Store";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import axios from "axios";

const Header = () => {
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const { cart, isLoggedIn, currentUser, setIsLoggedIn, setCurrentUser } =
    useContext(StoreContext);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const sidebarRef = useRef(null);


  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  // ✅ Fixed search function
  const handleSearch = async (e) => {
    e.preventDefault();
    const categories = ["Mobiles", "Watches"]; // ✅ Fixed names

    try {
      for (const category of categories) {
        const url = `${BASE_URL}/${category}`;
        console.log("Searching in:", url); // Debug log
        const response = await axios.get(url);

        const found = response.data.find(
          (item) => item.name.toLowerCase() === searchTerm.toLowerCase()
        );

        if (found) {
          setSearchTerm("");
          navigate(`/product/${category}/${found.id}`); // ✅ route matches
          return;
        }
      }

      alert("Product not found");
    } catch (err) {
      console.error("Search error:", err);
      alert("Error occurred while searching");
    }
  };

  // ✅ Close sidebar on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isSidebarOpen]);



  return (
    <header className="header">
      <h1>
        <SiSamsung className="brand" />
      </h1>

      {/* Desktop Navigation */}
      <nav className="navbar">
        <p>
          <Link className="link" to="/">
            Home
          </Link>
        </p>
        <p>
          <Link className="link" to="/Mobile">
            Mobiles
          </Link>
        </p>
        <p>
          <Link className="link" to="/Watch">
            SmartThings
          </Link>
        </p>
        <p>
          <Link className="link" to="/Contact">
            Contact
          </Link>
        </p>
        <p>
          <Link className="link" to="/About">
            About
          </Link>
        </p>

        {/* 🔍 Search input */}
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search Product"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-btn">
           <CiSearch />
          </button>
        </form>

        <p>
          <Link className="link-cart" to="/Cart">
            <MdOutlineShoppingBag className="icon" />
            {cart.length > 0 && (
              <span className="cart-count">{cart.length}</span>
            )}
          </Link>
        </p>

        {!isLoggedIn ? (
          <p>
            <Link className="Login" to="/LogIn">
              <SlLogin />
            </Link>
          </p>
        ) : (
          <>
            <p className="welcome">
              Welcome, <strong>{currentUser?.name}</strong>
            </p>
            <p>
              <Link className="Logout" to="#" onClick={handleLogout}>
                <SlLogout />
              </Link>
            </p>
          </>
        )}
      </nav>

       {/* Mobile Menu Button */}
      <button className="hamburger" onClick={() => setIsSidebarOpen(true)}>
        <GiHamburgerMenu />
      </button>

      {/* Sidebar Menu */}
      <div
        className={`sidebar ${isSidebarOpen ? "open" : ""}`}
        ref={sidebarRef}
      >
        <button className="close-btn" onClick={() => setIsSidebarOpen(false)}>
          <IoMdClose />
        </button>

        <nav className="sidebar-nav">
          <SiSamsung className="brand" />
          <Link className="link" to="/" onClick={() => setIsSidebarOpen(false)}>
            Home
          </Link>
          <Link className="link" to="/Mobile" onClick={() => setIsSidebarOpen(false)}>
            Mobiles
          </Link>
          <Link className="link" to="/Watch" onClick={() => setIsSidebarOpen(false)}>
            SmartThings
          </Link>
          <Link className="link" to="/Contact" onClick={() => setIsSidebarOpen(false)}>
            Contact
          </Link>
          <Link className="link" to="/About" onClick={() => setIsSidebarOpen(false)}>
            About
          </Link>

          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search Product"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-btn">
              <CiSearch />
            </button>
          </form>

          <Link className="link-cart" to="/Cart" onClick={() => setIsSidebarOpen(false)}>
            <MdOutlineShoppingBag className="icon" />
            {cart.length > 0 && (
              <span className="cart-count">{cart.length}</span>
            )}
          </Link>

          {!isLoggedIn ? (
            <Link className="Login" to="/LogIn" onClick={() => setIsSidebarOpen(false)}>
              <SlLogin />
            </Link>
          ) : (
            <>
              <p className="welcome">
                Welcome, <strong>{currentUser?.name}</strong>
              </p>
              <Link
                className="Logout"
                to="#"
                onClick={() => {
                  handleLogout();
                  setIsSidebarOpen(false);
                }}
              >
                <SlLogout />
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
