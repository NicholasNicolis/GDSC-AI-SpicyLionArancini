
import React from 'react';
// Importa il PDF che desideri visualizzare
import YourPDF from '../pdfs/aos.pdf';
import SideBar from "../component/sidebar";


function Page_Study(){

    const PDFViewer = () => {
        return (
        <div>
        <iframe src={YourPDF} className='ml-60 w-4/5 h-screen p-2'/>
        </div>
        );
       };

    return(
        <div>
            <SideBar/>
            <PDFViewer/>
        </div>

    );
}

export default Page_Study;