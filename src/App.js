import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "../src/pages/LoginPage.jsx"
import LandingPage from "../src/pages/LandingPage.jsx"
import CampaignPage from "../src/pages/CampaignPage.jsx"
import DocCenterPage from "../src/pages/DocCenterPage.jsx"
import BrokerComPage from "../src/pages/CMS/BrokerComPage.jsx"
import CategoriesPage from "../src/pages/CMS/CategoriesPage.jsx"
import EventCalendarPage from "../src/pages/CMS/EventCalendarPage.jsx"
import QuickLinksPage from "../src/pages/CMS/QuickLinksPage.jsx"
import CreateCampaignPage from "../src/pages/CreateCampaignPage.jsx"
import EditCampaignPage from "../src/pages/EditCampaignPage.jsx"
import EditDocumentPage from "../src/pages/EditDocumentPage.jsx"
import ViewDocumentPage from "../src/pages/ViewDocumentPage.jsx"
import CampaignDetailPage from "../src/pages/CampaignDetailPage.jsx"
import CreateDocCenterPage from "../src/pages/CreateDocCenterPage.jsx"
import SubCategoriesPage from "../src/pages/CMS/SubCategoriesPage.jsx"
import TestPage from "../src/pages/TestPage.jsx"
import { UserContext } from "./UserContext.js";
import React, { useEffect, useContext} from "react";
import { getCurrentBrowserFingerPrint } from "@rajesh896/broprint.js";
import Cookies from "js-cookie";
import {API_BASE_URL} from '../api.config.js';

function App() {

  const { user, setUser } = useContext(UserContext);
  const token = Cookies.get("PLUSID");

  useEffect(() => {
    // Fetch and set the user information
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
            setUser(data);
          })


        } catch (error) {
          Cookies.remove('PLUSID');
          console.error(error);
        }
      }
    }
  
    fetchData();
  }, [token, setUser]);

  if (!user) {
    return <div>Loading...</div>; // or a loading spinner
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/Landing" element={<LandingPage />} />
        <Route path="/Campaign" element={<CampaignPage />} />
        <Route path="/DocCenter" element={<DocCenterPage />} />
        <Route path="/BrokerCom" element={<BrokerComPage />} />
        <Route path="/Categories" element={<CategoriesPage />} />
        <Route path="/SubCategories" element={<SubCategoriesPage />} />
        <Route path="/EventCalendar" element={<EventCalendarPage />} />
        <Route path="/QuickLinks" element={<QuickLinksPage />} />
        <Route path="/CreateCampaign" element={<CreateCampaignPage />} />
        <Route path="/CreateDoc" element={<CreateDocCenterPage />} />
        <Route path="/EditCampaign" element={<EditCampaignPage />} />
        <Route path="/EditDocument" element={<EditDocumentPage />} />
        <Route path="/ViewDocument" element={<ViewDocumentPage />} />
        <Route path="/CampaignDetail" element={<CampaignDetailPage />} />
        <Route path="/Test" element={<TestPage />} />
      </Routes>
    </Router>
  );
}

export default App;
