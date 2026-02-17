import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Platyhelminthes from "./Platyhelminthes";
import Phylum4 from "./Phylum4";

function PlatyhelminthesHub() {
  return (
    <Router>
      <Routes>
        <Route path="/zoohub/Platyhelminthes" element={<Platyhelminthes />} />
        <Route path="/zoohub/Platyhelminthes/:slug" element={<Phylum4 />} />
      </Routes>
    </Router>
  );
}

export default PlatyhelminthesHub;
