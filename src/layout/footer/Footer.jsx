import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="foo-zl-footer">
      <div className="foo-zl-footer-inner">

        {/* ================= BRAND SECTION ================= */}
        <div className="foo-zl-brand">
          <div className="foo-zl-logo">
            <img
              src="https://res.cloudinary.com/duibfmcw1/image/upload/v1765947727/logopng_2_webaac.png"
              alt="ZooLearn Logo"
            />
            <h1>ZooLearn</h1>
          </div>

          <p className="foo-zl-tagline">
            Empowering students and NEET aspirants with interactive zoology education. 
            Master biology through visual taxonomy and structured learning paths.
          </p>
        </div>

        {/* ================= NAVIGATION LINKS ================= */}
        <div className="foo-zl-links">

          {/* -------- PLATFORM -------- */}
          <div className="foo-zl-col">
            <h3>Platform</h3>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/taxonomy-tree">Taxonomy Tree</Link>
              </li>
              <li>
                <Link to="/zoohub">ZooHub</Link>
              </li>
            </ul>
          </div>

          {/* -------- COMPANY -------- */}
          <div className="foo-zl-col">
            <h3>Company</h3>
            <ul>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/support">Support</Link>
              </li>
            </ul>
          </div>

          {/* -------- LEGAL -------- */}
          <div className="foo-zl-col">
            <h3>Legal</h3>
            <ul>
              <li>
                <Link to="/legal#privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/legal#terms-of-services">Terms of Service</Link>
              </li>
              <li>
                <Link to="/legal#cookie-policy">Cookie Policy</Link>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* ================= COPYRIGHT ================= */}
      <div className="foo-zl-copyright">
        <div className="foo-zl-copyright-content">
          <span>© {new Date().getFullYear()} ZooLearn EdTech. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;