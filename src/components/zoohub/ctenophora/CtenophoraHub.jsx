import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Ctenophora from "./Ctenophora";
import Phylum3 from "./Phylum3";

function CtenophoraHub() {
  return (
    <Router>
      <Routes>
        <Route path="/zoohub/Ctenophora" element={<Ctenophora />} />
        <Route path="/zoohub/Ctenophora/:slug" element={<Phylum3 />} />
      </Routes>
    </Router>
  );
}

export default CtenophoraHub;
