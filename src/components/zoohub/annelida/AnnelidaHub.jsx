import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Annelida from "./Annelida";
import Phylum6 from "./Phylum6";

function AnnelidaHub() {
  return (
    <Router>
      <Routes>
        <Route path="/zoohub/Annelida" element={<Annelida />} />
        <Route path="/zoohub/Annelida/:slug" element={<Phylum6 />} />
      </Routes>
    </Router>
  );
}

export default AnnelidaHub;
