import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Coelenterata from "./Coelenterata";
import Phylum2 from "./Phylum2";

function CoelenterataHub() {
  return (
    <Router>
      <Routes>
        <Route path="/zoohub/Coelenterata" element={<Coelenterata />} />
        <Route path="/zoohub/Coelenterata/:slug" element={<Phylum2 />} />
      </Routes>
    </Router>
  );
}

export default CoelenterataHub;
