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
        const response = await axios.post('URL_DEL_SERVER', formData, {
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
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="multiple_files">
        Upload multiple files
      </label>
      <input
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        id="multiple_files"
        type="file"
        multiple
        onChange={handleFileChange}
      />
      <button className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSubmit}>
        Upload
      </button>
    </div>
  );
}

export default InputDoc;

