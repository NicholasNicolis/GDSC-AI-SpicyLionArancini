import SideBar from "../component/sidebar";

function Exercise() {

  const renderExercise = () => {
    return (
      <div className="mb-6 py-4 px-6 bg-white sm:ml-64 overflow-auto">
            <h1 className="text-3xl font-black text-gray-800">EXERCISE JOURNEY</h1>
            <p className="text-xl text-justify mb-4">
            ...
            </p>

      </div>
    );
  };

  return (
    <div>
      <SideBar />
      {renderExercise()}
    </div>
  );
}

export default Exercise;
