import React, { useState } from "react";

function Accordion({ data }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="p-1 rounded-lg accordion ml-6 border-2 bg-white">
      {Object.keys(data).map((title, index) => (
        <div key={index} className={`accordion-item ${activeIndex === index ? 'active' : ''}`}>
          {Object.keys(data[title]).length > 0 ? (
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

function Graph() {
  const prova = {
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

  return (
    <div className="Graph mb-6 py-4 px-6 overflow-auto bg-white sm:ml-64">
        <div className="p-6 rounded-lg shadow-lg bg-gradient-to-br from-yellow-100 to-orange-200 ">
            <h1 className="text-3xl font-black text-gray-800">GRAPH SHOW</h1>
            <p className="text-xl text-justify mb-4">
            Below you will find a graphical representation of the main elements of your search, which have been connected by importance and significance.
            </p>
            <Accordion data={prova} />
        </div>
    </div>
  );
}

export default Graph;
