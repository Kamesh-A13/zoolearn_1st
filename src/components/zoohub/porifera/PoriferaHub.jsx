import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Porifera from "./Porifera";
import Phylum1 from "./Phylum1";

function PoriferaHub() {
  return (
    <Router>
      <Routes>
        <Route path="/zoohub/porifera" element={<Porifera />} />
        <Route path="/zoohub/porifera/:slug" element={<Phylum1 />} />
      </Routes>
    </Router>
  );
}

export default PoriferaHub;
