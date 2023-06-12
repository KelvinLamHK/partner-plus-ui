import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import PlusNavbar from "../components/PlusNavbar";
import LoadingScreen from "../components/LoadingScreen";
import "bootstrap/dist/css/bootstrap.css";
import { getCurrentBrowserFingerPrint } from "@rajesh896/broprint.js";
import {API_BASE_URL} from '../api.config.js';
import EditDocForm from "../components/EditDocForm";
import {useLocation} from 'react-router-dom';



function EditDocumentPage() {
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
            <div className="p-3 md:w-deflaut md:flex">
                <div className="w-full">
                    <a href="/DocCenter"><h1 className="my-4 text-ft-light hover:text-ft hover:underline">{location.state.event.titleEnglish}</h1></a>
                    <EditDocForm documentCenterList={(location.state!==null)?location.state.event:""}/>

                </div>
            </div>
        </div>
        </>
      )}
    </>
  );
}

export default EditDocumentPage;