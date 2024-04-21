import React, { useState } from 'react';
import axios from 'axios';

function InputDoc() {
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [map, setMap] = useState("");

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
        setMap(response.data);
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

            <Graph data={map} />
        </div>
    </div>
  );
}

export default InputDoc;



function Accordion({ data }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="p-1 rounded-lg accordion ml-6 border-2 bg-white">
      {Object.keys(data).map((title, index) => (
        <div key={index} className={`accordion-item ${activeIndex === index ? 'active' : ''}`}>
          {(Object.keys(data[title]).length > 0 && typeof data[title] !== 'string') ? (
            <button
              className={`accordion-title ${activeIndex === index ? 'font-bold' : ''}`}
              onClick={() => toggleAccordion(index)}
            >
              {title}
            </button>
          ) : (
            <div className="accordion-title">{title}</div>
          )}
          {activeIndex === index && (
            <div className="accordion-content">
              {data[title] && (
                <Accordion data={data[title]} />
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

const DisplayJSON = ({ data }) => {
  const renderNode = (node, key) => {
    if (typeof node === 'string') {
      return <li key={key}>{node}</li>;
    } else if (Array.isArray(node)) {
      return (
        <ul key={key}>
          {node.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      );
    } else if (typeof node === 'object') {
      return (
        <ul key={key}>
          {Object.entries(node).map(([subKey, subNode]) => (
            <li key={subKey}>
              <strong>{subKey}: </strong>
              {renderNode(subNode)}
            </li>
          ))}
        </ul>
      );
    }
  };

  return (
    <div>
      {Object.entries(data).map(([category, categoryData]) => (
        <div key={category}>
          <h2>{category}</h2>
          {Object.entries(categoryData).map(([section, sectionData]) => (
            <div key={section}>
              <h3>{section}</h3>
              {renderNode(sectionData)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};



const tmp = {
  "Short Stories for Children": {
      "General Information": {
          "About Folktales": "Folktales are stories of oral tradition passed down through generations and have multiple origins and variations.",
          "Into the Forest": "Forests in stories symbolize danger and adventure, often featuring magical and mysterious elements."
      },
      "Stories": {
          "Little Red Riding Hood": {
              "Plot": [
                  "Little Red Riding Hood sets out to visit her sick grandmother.",
                  "Meets a wolf who tricks her and eats her grandmother.",
                  "Wolf also eats Little Red Riding Hood but they are saved by a woodcutter."
              ],
              "Characters": [
                  "Little Red Riding Hood",
                  "Grandmother",
                  "Wolf",
                  "Woodcutter"
              ],
              "Themes": "Caution, innocence, and the perils of trusting strangers."
          },
          "Snow White and the Seven Dwarfs": {
              "Plot": [
                  "Snow White is targeted by her jealous stepmother, the Queen.",
                  "Escapes assassination and lives with seven dwarfs.",
                  "Queen poisons her with an apple but she is revived by a prince's kiss."
              ],
              "Characters": [
                  "Snow White",
                  "The Queen",
                  "The Seven Dwarfs",
                  "The Prince"
              ],
              "Themes": "Jealousy, beauty, and revival."
          }
      }
  }
}

const tmp2 = {
  "Advanced Operating Systems": {
    "Introduction to Operating Systems": {
      "Definition of CPU, Program, and Process": {},
      "User Mode vs Kernel Mode": {},
      "Goals of an Operating System": {
        "Resource Management": {},
        "Isolation and Protection": {},
        "System Extensibility": {}
      }
    },
    "Concurrency": {
      "Processes and States": {},
      "Context Switches": {},
      "Scheduling": {
        "Fairness": {},
        "Efficiency": {},
        "Priority": {},
        "Deadlines": {}
      },
      "General Purpose vs Real-time OS": {}
    },
    "Memory Management": {
      "Virtual Address Space": {},
      "Memory Models": {},
      "Demand Paging": {},
      "Task Creation and Management": {}
    },
    "I/O Devices and Drivers": {
      "Basics of I/O Devices": {},
      "Managing Block Devices": {},
      "I/O Schedulers": {}
    },
    "Virtualization": {
      "Types of Virtualization": {
        "Hardware Assisted": {},
        "Software Assisted": {}
      },
      "Memory Models in Virtualization": {},
      "Paravirtualization and VirtIO": {}
    },
    "Software Verification": {
      "Model Checking": {},
      "Automated Theorem Proving": {},
      "Memory Safety": {
        "Memory Leaks": {},
        "Multiple Ownership": {},
        "Borrowing in Rust": {}
      }
    },
    "Secure Boot": {},
    "Linux Device Management": {
      "devfs, sysfs, and udev": {},
      "Creating a New Character Device": {},
      "Differences Between Character and Block Devices": {}
    }
  }
};

function Graph(data) {
  {/* json */}
  const prova = tmp;

  return (
    <div className="Graph py-4 mt-4 overflow-auto ">
        <div className="p-6 rounded-lg shadow-lg bg-white ">
            <h1 className="text-3xl font-black text-gray-800">MIND MAP</h1>
            <p className="text-xl text-justify mb-4">
            Below you will find a graphical representation of the main elements of your search, which have been connected by importance and significance.
            </p>
            <DisplayJSON data={prova} />
        </div>
    </div>
  );
}
