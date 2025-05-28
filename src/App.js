import { Routes, Route } from "react-router-dom";
import Createaccount from "./pages/Createaccount";
import Account from './pages/Account';
import Header from './components/Header';
import Home from './pages/Home';
import Mobiles from './pages/Mobile'
import Watch from './pages/Watch';
import ProductView from './pages/ProductView';
import Checkout from "./pages/Checkout";
import Placeorder from "./pages/Placeorder";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";
import Footer from "./components/Footer";
import Pagenotfound from "./pages/Pagenotfound";

function App() {

  return (
        <div className="App">
          <Header/>
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/Createaccount" element={<Createaccount/>} />
              <Route path="/LogIn" element={<Account/>} />
              <Route path="/Mobile" element={<Mobiles/>} />
              <Route path="/Watch" element={<Watch/>} />
              <Route path="/product/:category/:id" element={<ProductView />} />
              <Route path="/Checkout"element={<Checkout/>} />
              <Route path="/Placeorder"element={<Placeorder/>} />
              <Route path="/Contact" element={<Contact/>} />
              <Route path="/About" element={<About/>} />
              <Route path="/Cart" element={<Cart/>} />
              <Route path="/Payment" element={<Payment />} />
              <Route path="/Pagenotfound" element={<Pagenotfound/>} />
            </Routes>
          <Footer/>
        </div>
  );
}

export default App;
