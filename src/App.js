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



function App() {
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
        <Route path="/EventCalendar" element={<EventCalendarPage />} />
        <Route path="/QuickLinks" element={<QuickLinksPage />} />
        <Route path="/CreateCampaign" element={<CreateCampaignPage />} />
      </Routes>
    </Router>
  );
}

export default App;
