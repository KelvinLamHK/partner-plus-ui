import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import PlusNavbar from "../../components/PlusNavbar";
import LoadingScreen from "../../components/LoadingScreen";
import "bootstrap/dist/css/bootstrap.css";
import { getCurrentBrowserFingerPrint } from "@rajesh896/broprint.js";


function QuickLinksPage() {
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
          const response = await fetch("http://kayu.life:8081/protected", {
            method: "POST",
            headers: {
              Authorization: 'plus ' + token,
              DeviceId: deviceId,
            },
          });
  
          const data = await response.text();
          if (data === "Invalid") { // check if response is "Invalid"
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
          <PlusNavbar />
          <h1>Current User: {username}</h1>
          <h1>Current Page: QuickLinksPage</h1>
        </>
      )}
    </>
  );
}

export default QuickLinksPage;