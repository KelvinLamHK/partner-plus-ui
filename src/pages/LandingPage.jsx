import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Cookies from "js-cookie";
import PlusNavbar from "../components/PlusNavbar";
import LoadingScreen from "../components/LoadingScreen";
import "../css/LandingPagecss.css"
import Calendar from "../components/Calendar"
import Searchbar from "../components/Searchbar"
import NoItem from "../components/NoItem";
import { getCurrentBrowserFingerPrint } from "@rajesh896/broprint.js";
import {API_BASE_URL} from '../api.config.js';

function LandingPage() {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const token = Cookies.get("PLUSID");

  useEffect(() => {
    async function fetchData() {
      const deviceId = await getCurrentBrowserFingerPrint();
      if (!token) {
        window.location.href = "/login";
      } else {
        try {
          const response = await fetch(`${API_BASE_URL}/protected`, {
            method: "POST",
            headers: {
              Authorization: 'plus ' + token,
              DeviceId: deviceId,
            },
          });
  
          const data = await response.text();
          if (data === "Invalid") { // check if response is "Invalid"
            Cookies.remove('PLUSID');
            window.location.href = "/login";
          } else {
            const jsonData = JSON.parse(data); // parse response as JSON
            setUsername(jsonData.username);
            setIsLoading(false);
          }
        } catch (error) {
          Cookies.remove('PLUSID');
          console.error(error);
          setIsLoading(false);
        }
      }
    }
  
    fetchData();
  }, [token]);

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <PlusNavbar username={username} />
          <div className="md:flex md:justify-center">
          <div className="p-3 md:flex md:flex-row md:w-deflaut">
            <div className="space-y-2 md:h-auto md:w-3/4 md:flex md:flex-col md:mr-4">
              <div className="md:h-screen md:flex md:flex-col">
                <div className="h-96 md:h-3/5 relative flex justify-center">
                  <div className="titlebar h-12 absolute ">
                    <span className="bold h4 text-white">Brokers Communications</span>
                  </div>
                  <div className="bg rounded shadow-lg w-full mt-3 flex justify-center items-center">
                    <NoItem />
                  </div>
                </div>
                <div className="h-96 md:h-2/5 relative flex justify-center">
                <div className="margin titlebar h-12 absolute ">
                    <span className="bold h4 text-white">Latest Promo</span>
                  </div>
                  <div className="bg rounded shadow-lg w-full mt-3 flex justify-center items-center">
                    <NoItem />
                  </div>
                </div>
              </div>
              <div className="md:h-screen md:flex md:flex-row md:space-x-2 ">
                <div className="md:w-1/2 md:h-fit  relative flex justify-center">
                <div className="titlebar h-12 absolute">
                    <span className="bold h4 text-white">Event Calendar</span>
                  </div>
                  <div className="bg rounded shadow-lg w-full mt-3 flex justify-center">
                    <Calendar />
                  </div>
                </div>
                <div className="margin md:w-1/2 md:h-full h-96 relative flex justify-center ">
                  <div className="titlebar h-12 absolute ">
                    <span className="bold h4 text-white">Quick Links</span>
                  </div>
                  <div className="bg rounded shadow-lg w-full mt-3 ">
                  </div>
                </div>
              </div>
            </div>
            <div className="md:h-full md:w-1/4 md:flex md:flex-col md:items-center space-y-2">
              <div className="margin w-full h-36 md:h-36 relative flex justify-center">
                  <div className="titlebar h-12 absolute truncate ">
                    <span className="bold h4 text-white">Policy Inquiry</span>
                  </div>
                  <div className="bg rounded shadow-lg w-full mt-3 flex justify-center p-2">                      
                    <Searchbar />
                  </div>
                </div>
              <div className="mt-4 w-full h-96 md:h-screen relative flex justify-center">
                <div className="margin titlebar h-12 absolute truncate mt-3">
                    <span className="bold h4 text-white">Document Centre</span>
                  </div>
                  <div className="bg rounded shadow-lg w-full mt-3 ">
                      
                  
                  </div>
              </div>
            </div>
          </div>
          </div>
        </>
      )}
    </>
  );
}

export default LandingPage;