import React, { useState } from 'react';
import axios from 'axios';

function ProfilingContent() {
  const [formData, setFormData] = useState({
    age: '',
    schoolOrJob: '',
    studyDescription: '',
    methodPreference: '',
    studyGoal: ''
  });
  const [displayData, setDisplayData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const url = 'http://localhost:8000/api/items/';
    const postData = {
      age: formData.age,
      schoolOrJob: formData.schoolOrJob,
      studyDescription: formData.studyDescription,
      methodPreference: formData.methodPreference,
      studyGoal: formData.studyGoal
    };

    axios.post(url, postData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      console.log(response.data);
      setDisplayData(response.data);
    })
    .catch((error) => {
      console.error('Error sending POST request:', error);
      setError(error);
    })
    .finally(() => {
      setLoading(false);
    });
  };

  return (
    <div className="py-4 px-6 sm:ml-64 overflow-auto bg-white">
      <div className="p-6 rounded-lg shadow-lg bg-gradient-to-br from-yellow-100 to-orange-200 ">
        <div className="text-left mb-4">
          <h1 className="text-3xl font-black text-gray-800 ">EXPLAIN YOURSELF</h1>
          <p className='text-xl text-justify'>Please take a moment to describe your studying experience by filling out this form. Your insights will help us enhance our guidance and tailor the learning method to better suit your profile.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mb-8">
          {/* Age and School/Job in the same row */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* Age */}
            <div>
              <label htmlFor="age" className="block font-semibold text-gray-800  mb-2">
                Age:
              </label>
              <input
                type="number"
                id="age"
                name="age"
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 "
                value={formData.age}
                onChange={handleChange}
                min="0"
                max="99"
                required
              />
            </div>

            {/* School/Job */}
            <div>
              <label htmlFor="schoolOrJob" className="block font-semibold text-gray-800  mb-2">
                School/Job:
              </label>
              <select
                id="schoolOrJob"
                name="schoolOrJob"
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 "
                value={formData.schoolOrJob}
                onChange={handleChange}
                required
              >
                <option value="">Select...</option>
                <option value="Middle School">Middle School</option>
                <option value="High School">High School</option>
                <option value="University">University</option>
                <option value="Work">Work</option>
              </select>
            </div>
          </div>

          {/* Text Inputs */}
          <div className="mb-4">
            {[
              { name: 'studyDescription', label: 'How do you usually study?' },
              { name: 'methodPreference', label: 'Do you feel comfortable with this method?' },
              { name: 'studyGoal', label: 'What is your study goal?' }
            ].map(({ name, label }) => (
              <div key={name} className="mb-4">
                <label htmlFor={name} className="block font-semibold text-gray-800  mb-2">
                  {label}
                </label>
                <textarea
                  id={name}
                  name={name}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 "
                  rows="3"
                  value={formData[name]}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
            ))}
          </div>

          {/* Send Button */}
          <button
            type="submit"
            className="w-full py-2 bg-gray-900 text-white rounded-lg shadow-md hover:bg-gray-700 focus:outline-none"
          >
            Send
          </button>
        </form>

        {/* Display Data */}
        {displayData && (
          <div className="mt-8 p-6 rounded-lg bg-white">
            <p className="font-bold mb-2 text-gray-800">Submitted Data:</p>
            <ul className="text-gray-800">
              {Object.entries(displayData).map(([key, value]) => (
                <li key={key} className="mb-2">
                  <strong>{key}:</strong> {value}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilingContent;
