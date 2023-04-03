import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import PlusNavbar from "../components/PlusNavbar";
import LoadingScreen from "../components/LoadingScreen";
import "bootstrap/dist/css/bootstrap.css";
import { getCurrentBrowserFingerPrint } from "@rajesh896/broprint.js";
import {API_BASE_URL} from '../api.config.js';
import EditCampaignForm from "../components/EditCampaignForm";
import {useLocation} from 'react-router-dom';



function EditCampaignPage() {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const token = Cookies.get("PLUSID");
  const location = useLocation();

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
            <div className="p-3 md:w-deflaut md:flex">
                <div className="w-full">
                    <a href="/Campaign"><h1 className="my-4 text-ft-light hover:text-ft hover:underline">New Campaign</h1></a>
                    <EditCampaignForm campaign={(location.state!==null)?location.state.event:""}/>

                </div>
            </div>
        </div>
        </>
      )}
    </>
  );
}

export default EditCampaignPage;