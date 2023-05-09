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
  const [links, setLinks] = useState([]);
  const [communications, setCommunications] = useState([]);

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

  useEffect(() => {
    fetch(`${API_BASE_URL}/cms/links`, {
      method: 'POST',

    })
      .then(response => response.json())
      .then(data => {
        setLinks(data);
      })
      .catch(error => console.error(error));
  }, []);

  
  // useEffect(() => {
  //   fetch(`${API_BASE_URL}/cms/communications`, {
  //     method: 'POST',

  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       setCommunications(data);
  //     })
  //     .catch(error => console.error(error));
  // }, []);

  
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
              <div className="">
              <div className="h-tableCommunication relative flex justify-center">
                    <div className="titlebar h-12 absolute ">
                      <span className="bold h4 text-white">Brokers Communications</span>
                    </div>

                    {communications.length === 0 ? (
                      <>
                        <div className="bg rounded shadow-lg w-full mt-3 flex justify-center items-center">
                            <NoItem />
                        </div>
                      </>
                    ) : (
                      <div className="bg rounded shadow-lg w-full mt-3 flex justify-center">
                        <ul className="mt-5 w-full mr-5 overflow-auto" style={{ paddingLeft: "20px", listStyleType: "circle" }}>
                          {communications
                            .sort((a, b) => (a.isPin === "Y" ? -1 : 1))
                            .filter(
                              (communication) =>
                                new Date(communication.startDate) <= new Date() &&
                                new Date(communication.endDate) >= new Date()
                            )
                            .map((communication, index) => (
                              <div className="border border-red-500 p-2 flex justify-between items-center" key={index}>
                                <div>
                                  <p className="mb-0 font-bold">Publish Date: {new Date(communication.startDate).toISOString().split('T')[0]}</p>
                                  <p className="mb-0">{communication.contentEngName}</p>
                                </div>
                                {communication.isPin === "Y" && (
                                  <svg fill="#004846" stroke="#004846" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="h-6">
                                    <path clip-rule="evenodd" fill-rule="evenodd" d="M10 2c-1.716 0-3.408.106-5.07.31C3.806 2.45 3 3.414 3 4.517V17.25a.75.75 0 001.075.676L10 15.082l5.925 2.844A.75.75 0 0017 17.25V4.517c0-1.103-.806-2.068-1.93-2.207A41.403 41.403 0 0010 2z"></path>
                                  </svg>
                                )}
                              </div>
                            ))}
                        </ul>
                      </div>
                    )}
                    </div>
                <div className="h-96 relative flex justify-center">
                <div className="margin titlebar h-12 absolute mt-2">
                    <span className="bold h4 text-white">Latest Promo</span>
                  </div>
                  <div className="bg rounded shadow-lg w-full mt-3 flex justify-center items-center">
                    <NoItem />
                  </div>
                </div>
              </div>
              <div className="md:flex md:flex-row md:space-x-2 ">
                <div className="md:w-1/2  relative flex justify-center">
                <div className="titlebar h-12 absolute">
                    <span className="bold h4 text-white">Event Calendar</span>
                  </div>
                  <div className="bg rounded shadow-lg w-full mt-3 flex justify-center">
                    <Calendar />
                  </div>
                </div>
                <div className="margin md:w-1/2 h-auto relative flex justify-center ">
                  <div className="titlebar h-12 absolute ">
                    <span className="bold h4 text-white">Quick Links</span>
                  </div>
                  <div className="bg rounded shadow-lg w-full mt-3 p-3 flex">
                      <div className="w-full my-2 mt-4">
                        <div>
                          {links.length===0?<><div className="flex mt-48"><NoItem /></div></>:
                          <ul style={{ paddingLeft: '20px' ,listStyleType: 'circle'}}>
                            {links.map((link, index) => (
                              <li key={index}>
                                <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-ft hover:text-ft-light text-lg">
                                  {link.linkEngName}
                                </a>
                              </li>
                            ))}
                          </ul>}
                        </div>
                        </div>
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