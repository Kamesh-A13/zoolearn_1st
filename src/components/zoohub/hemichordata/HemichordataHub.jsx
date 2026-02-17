import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hemichordata from "./Hemichordata";
import Phylum10 from "./Phylum10";

function HemichordataHub() {
  return (
    <Router>
      <Routes>
        <Route path="/zoohub/Hemichordata" element={<Hemichordata />} />
        <Route path="/zoohub/Hemichordata/:slug" element={<Phylum10 />} />
      </Routes>
    </Router>
  );
}

export default HemichordataHub;
