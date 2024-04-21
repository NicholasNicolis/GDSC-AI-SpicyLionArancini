import SideBar from "../component/sidebar";

function LearningJourney() {
  const tmp = {
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

  const renderLearningJourney = () => {
    return (
      <div className="mb-6 py-4 px-6 bg-white sm:ml-64 overflow-auto">
            <h1 className="text-3xl font-black text-gray-800">LEARNING JOURNEY</h1>
            <p className="text-xl text-justify mb-4">
            ...
            </p>

        {Object.keys(tmp.learning_journey).map((key) => (
          <div key={key}>
            <h3>{key}</h3>
            <pre>{JSON.stringify(tmp.learning_journey[key], null, 2)}</pre>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <SideBar />
      {renderLearningJourney()}
    </div>
  );
}

export default LearningJourney;
