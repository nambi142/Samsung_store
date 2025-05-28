import React, { useContext } from "react";
import { StoreContext } from "../context/Store";
import { useNavigate } from "react-router-dom";
import "../css/Account.css";


const Account = () => {
  
  const {Email,setEmail,Password,setPassword,errMsg,emailRef,passwordRef,handleSubmit} = useContext(StoreContext);
  const navigate = useNavigate();
 

  return (
    <div className="wrapper">
      <form onSubmit={(e) => handleSubmit(e)} className="form-container">
            <div className="form">
                <div className="singup">
                    <h3 className="heading">LOGIN</h3>
                    <div style={{ color: "red" }}>{errMsg}</div>
                    <label className="label">Email</label>
                    <input
                        type="Email"
                        placeholder="Email"
                        ref={emailRef}
                        value={Email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></input>
                    <label className="label">Password</label>
                    <input
                        type="password"
                        placeholder="password"
                        ref={passwordRef}
                        value={Password}
                        onChange={(e) => setPassword(e.target.value)}>
                    </input>
                    <button className="button">LOGIN</button>
                    <div className="foot">
                        <p onClick={() => navigate("/CreateAccount")}>Don't have an account? Sing Up</p>
                    </div>
                </div>
            </div>
      </form>
    </div>
  );
};

export default Account;
