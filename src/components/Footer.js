import React from "react";
import "../css/Footer.css";
import { Link } from "react-router-dom";
import { SiGmail } from "react-icons/si";
import {
  FaSquareInstagram,
  FaSquareWhatsapp,
  FaSquareGithub,
} from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      <footer className="footer">
        <div className="description">
          <div className="aboutme">
            <h1 className="About">About Me</h1>
            <p className="about">
              This website is made by me- Muthu Nambi A , more than just lines
              of code - it's a reflection of my skills, aspirations, and
              commitment to excellence. From the sleek design to the seamless
              functionality, every aspect has been carefully crafted with
              attention to detail. Explore, engage, and discover the essence of
              my work as you navigate through these digital realms.
            </p>
          </div>
          <div className="quicklinks">
            <h1>Quick Links</h1>
            <nav>
              <p>
                <Link to="/LogIn">Login</Link>
              </p>
              <p>
                <Link to="/About">About Us</Link>
              </p>
              <p>
                <Link to="/Contact">Contact</Link>
              </p>
            </nav>
          </div>
          <div className="getin">
            <h1>Get In Touch</h1>
            <p>
              Email:
              <Link to="https://mail.google.com" className="email">
                {" "}
                muthu142001@gmail.com
              </Link>
            </p>
            <p>Phone: +91-8637-619-849</p>
            <p>Mon - Fri: 9am - 6pm</p>
            <nav>
              <p>
                <Link to="https://www.instagram.com/nambi_707/">
                  <FaSquareInstagram />
                </Link>
              </p>
              <p>
                <Link to="https://wa.me/918637619849">
                  <FaSquareWhatsapp />
                </Link>
              </p>
              <p>
                <a href="mailto:muthu142001@gmail.com">
                <SiGmail />
                </a>
              </p>
              <p>
                <Link to="https://www.linkedin.com/in/muthu-nambi-6a463a238/">
                  <FaLinkedin />
                </Link>
              </p>
              <p>
                <Link to="https://github.com/nambi142">
                  <FaSquareGithub />
                </Link>
              </p>
            </nav>
          </div>
        </div>
        <div className="copyright">
          <p>© {new Date().getFullYear()} Muthu Nambi. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
export default Footer;
