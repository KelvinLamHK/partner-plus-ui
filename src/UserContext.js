import React, { createContext, useEffect, useState } from "react";
import { getCurrentBrowserFingerPrint } from "@rajesh896/broprint.js";
import Cookies from "js-cookie";
import { API_BASE_URL } from "./api.config";
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check the cookies and set the user information
    async function checkCookies() {
      const token = Cookies.get("PLUSID");
      if (!token) {
      } else {
        const deviceId = await getCurrentBrowserFingerPrint();
        try {
          fetch(`${API_BASE_URL}/authentication/protected`, {
            method: "POST",
            headers: {
              Authorization: "plus " + token,
              DeviceId: deviceId,
            },
          })
            .then((response) => response.json())
            .then((data) => {
              if (data === "Invalid") {
                Cookies.remove("PLUSID");
                window.location.href = "/login";
              }
              setUser(data);
            });
        } catch (error) {
          Cookies.remove("PLUSID");
          console.error(error);
        }
      }
    }

    checkCookies();
  }, []);

  if (!user) {
    return <div>Loading...</div>; // or a loading spinner
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
