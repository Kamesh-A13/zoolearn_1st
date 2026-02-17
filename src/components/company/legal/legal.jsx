import "./Legal.css";

const Legal = () => {
  return (
    <div className="legal-container">
      {/* Header */}
      <section className="legal-header">
        <h1>Legal Information</h1>
        <p>
          This page outlines ZooLearn’s Privacy Policy and Terms of Services.
          Please read them carefully before using the platform.
        </p>
      </section>

      {/* ================= PRIVACY POLICY ================= */}
      {/* ================= PRIVACY POLICY ================= */}
<section className="legal-section" id="privacy-policy">
  <h2>Privacy Policy</h2>

        <h3>1. Introduction</h3>
        <p>
          ZooLearn is committed to protecting the privacy of its users. This
          Privacy Policy explains how information is collected, used, stored,
          and protected when users access or use the ZooLearn platform.
        </p>
        <p>
          By using ZooLearn, you agree to the practices described in this Privacy
          Policy.
        </p>

        <h3>2. Information We Collect</h3>
        <ul>
          <li>Basic user information such as name or email, if voluntarily provided</li>
          <li>Usage data including pages visited, time spent, and interactions</li>
          <li>Device and browser information for performance optimization</li>
        </ul>
        <p>
          ZooLearn does not collect sensitive personal data unless explicitly
          required and consented to by the user.
        </p>

        <h3>3. Use of Information</h3>
        <ul>
          <li>Improve platform content and functionality</li>
          <li>Maintain platform security</li>
          <li>Provide support and respond to user queries</li>
          <li>Analyze learning trends to enhance educational quality</li>
        </ul>
        <p>
          User data is never sold or shared with third parties for commercial
          purposes.
        </p>

        <h3>4. Data Protection</h3>
        <p>
          ZooLearn implements reasonable technical and organizational measures to
          protect user data from unauthorized access, misuse, or loss.
        </p>

        <h3>5. User Rights</h3>
        <ul>
          <li>Request access to personal data</li>
          <li>Request correction or deletion of data</li>
          <li>Withdraw consent where applicable</li>
        </ul>

        <h3>6. Policy Updates</h3>
        <p>
          ZooLearn reserves the right to update this Privacy Policy at any time.
          Continued use of the platform implies acceptance of updated terms.
        </p>
      </section>

      
      <div className="legal-divider" />


     {/* ================= TERMS OF SERVICES ================= */}
<section className="legal-section" id="terms-of-services">
  <h2>Terms of Services</h2>


        <h3>1. Acceptance of Terms</h3>
        <p>
          By accessing or using ZooLearn, users agree to comply with these Terms
          of Services.
        </p>

        <h3>2. Use of Content</h3>
        <p>
          All educational content on ZooLearn is intended for personal,
          non-commercial educational use.
        </p>
        <ul>
          <li>Users may not copy, redistribute, or sell content</li>
          <li>Users may not modify or republish content without permission</li>
          <li>Users may not use the platform for unlawful purposes</li>
        </ul>

        <h3>3. Intellectual Property</h3>
        <p>
          All content, including text, structure, illustrations, and designs, is
          the intellectual property of ZooLearn unless otherwise stated.
        </p>

        <h3>4. Platform Access</h3>
        <ul>
          <li>ZooLearn may modify or discontinue features</li>
          <li>Access may be restricted or terminated if terms are violated</li>
          <li>Content may be updated without prior notice</li>
        </ul>

        <h3>5. Limitation of Liability</h3>
        <p>
          ZooLearn is an educational resource and does not guarantee exam results
          or outcomes. Users are responsible for how they use the information
          provided.
        </p>

        <h3>6. Governing Law</h3>
        <p>
          These Terms are governed by applicable laws and regulations.
        </p>
      </section>
    </div>
  );
};

export default Legal;
