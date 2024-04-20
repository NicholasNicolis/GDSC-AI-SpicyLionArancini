import axios from "axios";

import './App.css';
import DefaultContent from './component/defaultContent';


import SideBar from "./component/sidebar";


function App() {
  return (
    <div className="bg-gray-100">

    <SideBar/>
    <DefaultContent/>

    </div>
  );
}

export default App;
