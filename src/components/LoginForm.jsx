import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
// import {getUniqueId} from 'react-native-device-info'
import FTLifePartnerPlus_Logo from "../img/FTLifePartnerPlus_Logo.png"
import LoadingSpinner from "./LoadingSpinner.jsx"
import "../css/LoginFormCss.css"

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [checkTokenLoading, setCheckTokenLoading] = useState(true);
    const [isRecord, setIsRecord] = useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      try {
        const response = await axios.post("http://localhost:8080/login", {
          username,
          password,
        });
        if (response.data === "No") {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Incorrect username or password",
            type: "error",
          });
          setIsError(true);
        } else {
          Cookies.set("PLUSID", response.data, { expires: 7 });
          Swal.fire({
            icon: "success",
            showConfirmButton: true,
            confirmButtonText: 'Agree', 
            confirmButtonAriaLabel: 'Agree',
            confirmButtonColor: '#004846',
            title: "Partner Plus - Terms of Use",
            text: "You are now logged in",

            showCancelButton: true,


          });
          setIsSuccess(true);
        }
      } catch (error) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    useEffect(() => {
        const checkToken = async () => {
          setCheckTokenLoading(true);
          const token = Cookies.get("PLUSID");
          if (token) {
            try {
              const response = await axios.post(
                "http://localhost:8080/protected",
                {},
                {
                  headers: {
                    Authorization: `plus ${token}`,
                  },
                }
              );
              if (response.data === "success") {
                setIsRecord(true);
              }
            } catch (error) {
              console.error(error);
            } finally {
              setCheckTokenLoading(false);
            }
          } else {
            setCheckTokenLoading(false);
          }
        };
        checkToken();
      }, []);
    
      if (checkTokenLoading) {
        return (
          <div>
            <LoadingSpinner />
          </div>
        );
      }
    
      if (isRecord) {
        window.location.href = "/Landing";
        return null;
      }
    
      if (isSuccess) {
        setTimeout(() => {
          window.location.href = "/Landing";
        }, 1500);
        return null;
      }

  return (
    <div className="shadow-md rounded p-12 max-w-lg bg-white flex items-center justify-center">
        <div>
            <img
              alt="FTLifePartnerPlus_Logo"
              src={FTLifePartnerPlus_Logo}
            />
            <h1 class="mt-4 text-center text-title mb-5">
                <span class="text-2xl font-semibold">Partner+ FTL </span>
                <span class="text-2xl font-semibold">Admin</span>
            </h1>
            <div className="user-box h-10 mb-5">
                <input 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} 
                    type="text" 
                    required="requried" 
                    className="focus:ring-transparent focus:ring-offset-transparent focus:border-ft"
                />
                <label>Username</label>
            </div>
            <div className="user-box h-10 mb-10">
                <input                     
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                    type="password" 
                    required="requried" 
                    className="focus:ring-transparent focus:ring-offset-transparent focus:border-ft"
                />
                <label>Password</label>
            </div>
            <div className="mb-4 full-width flex justify-center">
                <button
                    className="btn w-full p-2 btn-primary rounded text-white active:bg-white hover:bg-ft-light active:text-ft active:ring-1 active:ring-ft transition"
                    type="submit"
                    disabled={isLoading}
            style={{
              backgroundColor: isLoading
                ? "lightgray"
                : isSuccess
                ? "green"
                : "",
              transition: "all 0.5s ease-in-out",
            }}
                >
                    Login
                </button>
            </div>
        </div>
    </div>
  );
};

export default LoginForm;
