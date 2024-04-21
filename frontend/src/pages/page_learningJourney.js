import SideBar from "../component/sidebar"

function LearningJourney(){

    return(
        <div>
            <SideBar/>
            <GraphLineare/>
        </div>

    );

}

const data = {
    "learning_journey": {
      "duration": "2 academic years",
      "semesters": [
        {
          "semester": 1,
          "duration": "6 months",
          "courses": [
            {
              "course_title": "Introduction to Computer Science",
              "description": "Covers basic concepts of computing, programming fundamentals, and an introduction to algorithms.",
              "topics": [
                "Basic programming",
                "Data structures",
                "Algorithms"
              ]
            },
            {
              "course_title": "Introduction to Operating Systems",
              "description": "Introduces basic concepts of operating systems, including process management, memory management, and file systems.",
              "topics": [
                "Process management",
                "Memory management",
                "File systems"
              ]
            }
          ]
        },
        {
          "semester": 2,
          "duration": "6 months",
          "courses": [
            {
              "course_title": "Advanced Operating Systems",
              "description": "Explores advanced topics in operating systems such as concurrency, synchronization, and virtualization.",
              "topics": [
                "Concurrency models",
                "Synchronization techniques",
                "Virtualization"
              ]
            },
            {
              "course_title": "Systems Programming",
              "description": "Focuses on low-level programming, including interaction with hardware, system calls, and performance optimization.",
              "topics": [
                "System calls",
                "I/O devices and drivers",
                "Performance optimization"
              ]
            }
          ]
        },
        {
          "semester": 3,
          "duration": "6 months",
          "courses": [
            {
              "course_title": "Computer Architecture",
              "description": "Covers the design and function of computer hardware, including processors, memory, and input/output systems.",
              "topics": [
                "CPU architecture",
                "Memory hierarchy",
                "I/O systems"
              ]
            },
            {
              "course_title": "Networks and Communications",
              "description": "Introduces network fundamentals, protocols, and communications between computers and devices.",
              "topics": [
                "Network protocols",
                "Data transmission",
                "Network security"
              ]
            }
          ]
        },
        {
          "semester": 4,
          "duration": "6 months",
          "courses": [
            {
              "course_title": "Software Verification and Security",
              "description": "Focuses on methods to ensure software reliability and security, including testing and formal verification techniques.",
              "topics": [
                "Software testing",
                "Formal verification methods",
                "Security models"
              ]
            },
            {
              "course_title": "Capstone Project",
              "description": "A project course where students apply their knowledge to a large-scale software or system project, potentially focusing on operating systems or system security.",
              "topics": [
                "Project planning",
                "Implementation",
                "Evaluation"
              ]
            }
          ]
        }
      ]
    }
  };

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


  function GraphLineare(data) {
    {/* json */}
    const prova = data;
  
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

export default  LearningJourney;