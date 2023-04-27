import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import PlusNavbar from "../../components/PlusNavbar";
import Communication from "../../components/Communication";
import LoadingScreen from "../../components/LoadingScreen";
import "bootstrap/dist/css/bootstrap.css";
import { getCurrentBrowserFingerPrint } from "@rajesh896/broprint.js";
import {API_BASE_URL} from '../../api.config.js';

function BrokerComPage() {
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
          window.location.href = "/login";
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
        <PlusNavbar username={username}/>
          <div className="md:flex md:justify-center">
            <div className="p-3 md:flex md:flex-row">
              <Communication />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default BrokerComPage;