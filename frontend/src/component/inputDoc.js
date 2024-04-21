import React, { useState } from 'react';
import axios from 'axios';

function InputDoc() {
  const [selectedFiles, setSelectedFiles] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
  };

  const handleSubmit = async () => {
    if (selectedFiles) {
      const formData = new FormData();
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append('files', selectedFiles[i]);
      }
      try {
        const response = await axios.post('/api/items/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Upload successful', response);
        // Qui puoi gestire eventuali azioni dopo l'upload dei file
      } catch (error) {
        console.error('Error uploading files', error);
      }
    }
  };

  return (
    <div className='py-4 px-6 sm:ml-64 overflow-auto bg-white'>
        <div className="p-6 rounded-lg shadow-lg bg-gradient-to-br from-yellow-100 to-orange-200 ">
            <h1 className="text-3xl font-black text-gray-800">WHAT YOU WANNA STUDY</h1>
            <p className="text-xl text-justify mb-4">
            Now you have to upload the file you wanna start studying
            </p>

            <label className="block mb-2 text-xl font-semibold text-gray-900" htmlFor="multiple_files">
                Upload files
            </label>
            <div className='flex items-center'>
                <input
                className="p-2 block w-4/5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none"
                id="multiple_files"
                type="file"
                multiple
                onChange={handleFileChange}
                />
                <button className="ml-4 py-2 px-4 bg-gray-900 text-white rounded-lg shadow-md hover:bg-gray-700 focus:outline-none" onClick={handleSubmit}>
                Ask Duck
                </button>
            </div>
        </div>
    </div>
  );
}

export default InputDoc;
