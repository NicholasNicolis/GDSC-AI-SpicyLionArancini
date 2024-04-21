import axios from "axios";

import { BrowserRouter, Route, Routes} from "react-router-dom";

import './App.css';
import DefaultContent from './component/defaultContent';

import Page_Upload from "./pages/page_upload";
import Page_Study from "./pages/page_study";
import Page_Graphs from "./pages/page_graphs";
import Page_UserProfile from "./pages/page_userProfile"
import LearningJourney from "./pages/page_learningJourney"


function App() {
  return (
    <div className="bg-gray-100">

    <BrowserRouter>
      <Routes>
        <Route path="/userprofile/*" element={<Page_UserProfile/>} />
        <Route path="/" element={<Page_UserProfile/>} />
        <Route path="/upload/*" element={<Page_Upload />} />
        <Route path="/study/*" element={<Page_Study />} />
        <Route path="/learningjourney/*" element={<LearningJourney />} />
        {/**
        <Route path="/graphs/*" element={<Page_Graphs />} />
         */}


      </Routes>
    </BrowserRouter>

    </div>
  );
}

export default App;
