import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Mollusca from "./Mollusca";
import Phylum8 from "./Phylum8";

function MolluscaHub() {
  return (
    <Router>
      <Routes>
        <Route path="/zoohub/Mollusca" element={<Mollusca />} />
        <Route path="/zoohub/Mollusca/:slug" element={<Phylum8 />} />
      </Routes>
    </Router>
  );
}

export default MolluscaHub;
