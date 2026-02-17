import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Aschelminthes from "./Aschelminthes";
import Phylum5 from "./Phylum5";

function AschelminthesHub() {
  return (
    <Router>
      <Routes>
        <Route path="/zoohub/Aschelminthes" element={<Aschelminthes />} />
        <Route path="/zoohub/Aschelminthes/:slug" element={<Phylum5 />} />
      </Routes>
    </Router>
  );
}

export default AschelminthesHub;
