import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Arthropoda from "./Arthropoda";
import Phylum7 from "./Phylum7";

function ArthropodaHub() {
  return (
    <Router>
      <Routes>
        <Route path="/zoohub/Arthropoda" element={<Arthropoda />} />
        <Route path="/zoohub/Arthropoda/:slug" element={<Phylum7 />} />
      </Routes>
    </Router>
  );
}

export default ArthropodaHub;