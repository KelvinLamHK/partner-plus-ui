import React, { useState, useEffect ,useContext } from "react";
import Cookies from "js-cookie";
import PlusNavbar from "../components/PlusNavbar";
import LoadingScreen from "../components/LoadingScreen";
import "bootstrap/dist/css/bootstrap.css";
import { getCurrentBrowserFingerPrint } from "@rajesh896/broprint.js";
import {API_BASE_URL} from '../api.config.js';
import CampaignList from "../components/CampaignList";
import { UserContext } from "../UserContext";


function CampaignPage() {

  const { user } = useContext(UserContext);


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
          fetch(`${API_BASE_URL}/authentication/protected`, {
            method: "POST",
            headers: {
              Authorization: 'plus ' + token,
              DeviceId: deviceId,
            },
          }).then(response => response.json())
          .then(data => {
            if(data==="Invalid"){
              Cookies.remove('PLUSID');
              window.location.href = "/login";
            }
            setUsername(data.username);
            setIsLoading(false);
          })


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
          <PlusNavbar username={username}/>
          <div className="md:flex md:justify-center">
          <div className="p-3 md:flex md:flex-row">
          <CampaignList />
          </div>
          </div>
        </>
      )}
    </>
  );
}

export default CampaignPage;