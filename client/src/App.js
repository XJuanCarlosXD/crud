import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Contact from "./Screens/Contact";
import Home from "./Screens/Home";
import Index from "./Screens/Index";

function App() {
  return (
    <div className="container">
      <Router>
        <NavBar />
        <Routes>
          <Route index element={<Index />} />
          <Route path="/home" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
