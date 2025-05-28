import React from 'react'
import "../css/Contact.css";
import { Link } from 'react-router-dom';


const Contact = () => {

  return (
    <div className="container">
         <main className='contactus'>
            <h1>Contact Us</h1>
            <p>Email :<Link to="https://mail.google.com">   muthu142001@gmail.com</Link></p>
            <p>Phone : +91-8637-619-849</p>
            <p>Mon - Fri: 9am - 6pm</p>
            <p>For any queries, please reach out to us at the above email or phone number.</p>
          </main>
     </div>
  )
}

export default Contact;
