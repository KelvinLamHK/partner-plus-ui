import React, { useState, useEffect } from "react";
import FTLifePartnerPlus_Logo from "../img/FTLifePartnerPlus_Logo.png"
import LoginFormCss from "../css/LoginFormCss.css"

const LoginForm = () => {
  
  return (
    <div className="shadow-md rounded p-12 max-w-lg bg-white flex items-center justify-center">
        <div>
            <img
              alt="FTLifePartnerPlus_Logo"
              src={FTLifePartnerPlus_Logo}
            />
            <h1 class="mt-4 text-center text-title mb-5">
                <span class="text-2xl">Partner+ FTL </span>
                <span class="text-2xl">Admin</span>
            </h1>
            <div className="user-box h-10 mb-5">
                <input type="text" required="requried" className="focus:ring-transparent focus:ring-offset-transparent focus:border-ft"/>
                <label>Username</label>
            </div>
            <div className="user-box h-10 mb-10">
                <input type="password" required="requried" className="focus:ring-transparent focus:ring-offset-transparent focus:border-ft"/>
                <label>Password</label>
            </div>
            <div className="mb-4 full-width flex justify-center">
                <button
                    className="btn w-full p-2 btn-primary rounded text-white active:bg-white hover:bg-ft-dark active:text-ft active:ring-1 active:ring-ft transition"
                    type="submit" 
                >
                    Login
                </button>
            </div>
        </div>
    </div>
  );
};

export default LoginForm;
