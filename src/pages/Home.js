import { useContext } from "react";
import { StoreContext } from "../context/Store";
import "../css/Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  const {
    sliderImages,
    currentIndex,
    goToPrev,
    goToNext,
    goToSlide,
  } = useContext(StoreContext);

  return (
    <div className="home">
      <main className="home-main">
        <div className="slider-container">
          {sliderImages.length > 0 && (
            <img
              src={process.env.PUBLIC_URL + "/" + sliderImages[currentIndex].image}
              alt={sliderImages[currentIndex].name}
              className="slider-image"
            />
          )}

          <button className="nav prev" onClick={goToPrev}>
            ❮
          </button>
          <button className="nav next" onClick={goToNext}>
            ❯
          </button>

          <div className="dots">
            {sliderImages.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentIndex ? "active" : ""}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </main>

      <div className="login">
        <p className="signup">SIGN UP AND GET 15% OFF</p>
        <button className="bt">
          <Link className="bt" to="/LogIn">
            SIGN UP
          </Link>
        </button>
      </div>

      <div className="showcase">
        <h2>New Arrivals</h2>
        <div className="showcase-images">
          <div className="showbox">
           <Link to="/Mobile" className="path"><img src="/img/galaxy-s24.png" alt="mobile"/>
            <p>Galaxy-S-24</p></Link>
          </div>
          <div className="showbox">
            <Link to="/Mobile" className="path"><img src="/img/galaxy-s25.png" alt="mobile"/>
            <p>Galaxy-S-25</p></Link>
          </div>
          <div className="showbox">
            <Link to="/Mobile" className="path"><img src="/img/galaxy-s25pro.png" alt="mobile"/>
            <p>Galaxy-S-Pro</p></Link>
          </div>
          <div className="showbox">
            <Link to="/Mobile" className="path"><img src="/img/galaxy-z-fold6.png" alt="mobile"/>
            <p>Galaxy-Z-fold6</p></Link>
          </div>
          <div className="showbox">
            <Link to="/Mobile" className="path"><img src="/img/galaxy-a35.png" alt="mobile"/>
            <p>Galaxy-a35</p></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
