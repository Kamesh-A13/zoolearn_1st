import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Echinodermata from "./Echinodermata";
import Phylum9 from "./Phylum9";

function EchinodermataHub() {
  return (
    <Router>
      <Routes>
        <Route path="/zoohub/Echinodermata" element={<Echinodermata />} />
        <Route path="/zoohub/Echinodermata/:slug" element={<Phylum9 />} />
      </Routes>
    </Router>
  );
}

export default EchinodermataHub;
