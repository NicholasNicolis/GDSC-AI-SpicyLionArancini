import axios from "axios";

import './App.css';
import DefaultContent from './component/defaultContent';


import SideBar from "./component/sidebar";
import ProfilingContent from "./component/profilingContent";
import InputDoc from "./component/inputDoc";


function App() {
  return (
    <div className="bg-gray-100">

    <SideBar/>
    {/*<DefaultContent/>*/}
    <ProfilingContent/>
    <InputDoc/>

    </div>
  );
}

export default App;
