import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { getCurrentBrowserFingerPrint } from "@rajesh896/broprint.js";
import FTLifePartnerPlus_Logo from "../img/FTLifePartnerPlus_Logo.png"
import "../css/LoginFormCss.css"

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isRecord, setIsRecord] = useState(false);
    const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
      try {
        const deviceId = await getCurrentBrowserFingerPrint();
        const response = await axios.post("http://kayu.life:8081/login", {
          username,
          password,
          deviceId
        });
        if (response.data === "Invalid") {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Incorrect username or password",
            type: "error",
          });
          setIsError(true);
        } else {
          Cookies.set("PLUSID", response.data, { expires: 7 });
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
        const deviceId = getCurrentBrowserFingerPrint();
        const checkToken = async () => {
          const token = Cookies.get("PLUSID");
          if (token) {
            try {
              const response = axios.post('http://kayu.life:8081/protected', null, {
                headers: {
                    Authorization: 'plus ' + token,
                    DeviceId: deviceId
                }
            });
              if (response.data !== "Invalid") {
                setIsRecord(true);
              }
            } catch (error) {
              console.error(error);
            }
          }
        };
        checkToken();
      }, []);
    
      if (isRecord) {
        return null;
      }
    
      if (isSuccess) {

        const handleAccept = () => {
          window.location.href = "/Landing";
        };
      
        const handleDecline = () => {
          Cookies.remove('PLUSID');
          window.location.href = "/login";
        };
return(<div className="w-1/2 h-1/2 overflow-y-hidden">
  <div class="" aria-labelledby="exampleModalScrollableTitle" role="dialog" aria-modal="true">
  <div class="flex items-center justify-center">
    <div class="bg-white rounded-lg shadow-lg ">
      <div class="px-6 py-4">
        <div class="flex items-center justify-between mb-4">
          <h5 class="text-lg font-semibold text-gray-900" id="exampleModalScrollableTitle">Modal title</h5>
        </div>
        <div class="modal-body h-36 overflow-y-auto">
          <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
                </p>
                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
                </p>
                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
                </p>
                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
                </p>
                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
                </p>
                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
                </p>
                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
                </p>
                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
                </p>
                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
                </p>
                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
                </p>
                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
                </p>
                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
                </p>
        </div>
      </div>
      <div class="px-6 py-4 bg-gray-100 flex justify-end">
        <button type="button" class="text-white bg-blue-500 hover:bg-blue-600 rounded-md px-4 py-2 mr-2" data-dismiss="modal">Close</button>
        <button type="button" class="text-white bg-green-500 hover:bg-green-600 rounded-md px-4 py-2">Save changes</button>
      </div>
    </div>
  </div>
</div>
</div>
      )
    }

  return (
    <div className="shadow-md rounded p-12 max-w-lg bg-white flex items-center justify-center">
        <form onSubmit={handleSubmit}>
            <img
              alt="FTLifePartnerPlus_Logo"
              src={FTLifePartnerPlus_Logo}
            />
            <h1 className="mt-4 text-center text-title mb-5">
                <span className="text-2xl font-semibold">Partner+ FTL </span>
                <span className="text-2xl font-semibold">Admin</span>
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
                    {isLoading ? (
              "Loading..."
            ) : "Login" }
                </button>
            </div>
        </form>
    </div>
  );
};

export default LoginForm;
