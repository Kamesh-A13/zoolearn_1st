import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chordata from "./Chordata";
import Phylum11 from "./Phylum11";

function ChordataHub() {
  return (
    <Router>
      <Routes>
        <Route path="/zoohub/chordata" element={<Chordata />} />
        <Route path="/zoohub/chordata/:slug" element={<Phylum11 />} />
      </Routes>
    </Router>
  );
}

export default ChordataHub;
