import React from 'react'
import '../css/Placeorder.css';
import { Link } from 'react-router-dom'
const Placeorder = () => {
  return (
    <div className= "orderconfirm">
      <h1>Your Order Placed Successfully</h1>
      <p>Thank you</p>
      <p>Your Order will be arrived in Three bussiness days</p>
      <Link to="https://www.google.com/maps/place/Samsung+Seoul+R%26D+Campus/@37.4659342,126.4956379,10z/data=!4m10!1m2!2m1!1ssamsung+headquarters+in+south+korea!3m6!1s0x357ca0d8ad0a1681:0x14d966214f70eff5!8m2!3d37.4659052!4d127.0229716!15sCiNzYW1zdW5nIGhlYWRxdWFydGVycyBpbiBzb3V0aCBrb3JlYSIDiAEBkgEScmVzZWFyY2hfaW5zdGl0dXRlqgGWAQoNL2cvMTFjNTludHd6MQoJL20vMDFubjc5CgovbS8wNHpqajExCgkvbS8wN2d2NzIQASoYIhRzYW1zdW5nIGhlYWRxdWFydGVycygAMh4QASIacqWJ4RbShUKoLeqDE1SE0tQDWCm0damWABoyJxACIiNzYW1zdW5nIGhlYWRxdWFydGVycyBpbiBzb3V0aCBrb3JlYeABAA!16s%2Fg%2F11bwh5gc42?entry=ttu&g_ep=EgoyMDI1MDUyMS4wIKXMDSoASAFQAw%3D%3D" className='address'><div>Track Your Order </div></Link>
    </div>
  )
}

export default Placeorder;
