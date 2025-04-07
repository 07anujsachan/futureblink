import { Link } from "react-router-dom";
import { Header } from "../components/Header";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col background">

  <Header/>


      <div className="flex-1 flex flex-col items-center justify-center text-center px-4 ">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Build Automated Email Sequences Visually
        </h1>
        <p className="text-gray-600 mb-8 max-w-xl">
          Design, automate, and manage your email marketing sequences with our visual flowchart interface
        </p>
        <Link to="/dashboard">
          <button className="bg-blue-600 text-white px-6 py-3 rounded text-lg hover:bg-blue-700">
            Start Free
          </button>
        </Link>
      </div>


      <footer className="text-center text-gray-500 py-6">
        &copy; {new Date().getFullYear()} Future<span className="text-blue-500">Blink</span>. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
