import '@xyflow/react/dist/style.css';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage';
import Sequence from './pages/Sequence';



export default function App() {


  return (
    <Router>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/builder/new" element={<Sequence />} />
      <Route path="/builder/:id" element={<Sequence />} />
    </Routes>
  </Router>
  );
}
