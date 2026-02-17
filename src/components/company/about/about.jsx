import "./about.css";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const About = () => {
  const location = useLocation();
  useEffect(() => {
    const handleScroll = () => {
      if (location.hash) {
        const element = document.querySelector(location.hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        } else {
          setTimeout(handleScroll, 300);
        }
      }
    };


    handleScroll();
  }, [location]);

  return (
    <>
      <div className="about-container">
        {/* Header */}
        <section className="about-header">
          <h1>About ZooLearn</h1>
          <p>
            ZooLearn is a specialized educational platform dedicated to zoology,
            animal taxonomy, and biological sciences.
          </p>
        </section>

        {/* About Content */}
        <section className="about-section">
          <p>
            ZooLearn is designed to support school students, NEET aspirants,
            undergraduate learners, and early-stage researchers by providing
            structured, syllabus-aligned, and scientifically accurate content.
          </p>

          <p>
            The platform focuses on building a strong academic foundation in
            zoology through carefully curated content based on NCERT guidelines
            and modern taxonomy. ZooLearn currently offers a complete taxonomy
            tree for school-level zoology, along with a comprehensive collection
            of animals from Class 10, Class 11, Class 12, and NEET syllabi.
          </p>

          <p>
            In addition to classification, ZooLearn provides fully completed
            content on human evolution, covering evolutionary stages, key
            characteristics, and scientific significance. The platform also
            includes detailed anatomical studies of the leech, cockroach, and
            rabbit, which are among the most important and frequently tested
            zoology topics.
          </p>

          <p>
            ZooLearn is built with a long-term vision of integrating intelligent
            learning tools. While the current platform emphasizes content accuracy
            and conceptual clarity, AI-based features are under development and
            will be introduced in future phases.
          </p>
        </section>
        {/* <HomePage /> */}

        {/* Mission */}
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            ZooLearn’s mission is to make zoology learning clear, structured, and
            reliable for every learner.
          </p>
          <ul>
            <li>Provide complete and syllabus-accurate zoology content</li>
            <li>Follow modern and accepted taxonomic classification systems</li>
            <li>Simplify complex zoological concepts without losing scientific depth</li>
            <li>Support students in academic learning and competitive exam preparation</li>
            <li>
              Build a platform that gradually evolves with technology while
              maintaining academic integrity
            </li>
          </ul>
        </section>

        {/* Future Plans */}
        <section className="about-section">
          <h2>Future Plans</h2>
          <ul>
            <li>AI-powered chatbot for doubt-solving and concept clarification</li>
            <li>AI-powered quizzes with Easy, Medium, and Hard difficulty levels</li>
            <li>Personalized learning recommendations</li>
            <li>Advanced zoology modules and certification-based courses</li>
            <li>Interactive taxonomy exploration and comparison tools</li>
            <li>Research-support resources for higher-level learners</li>
            <li>Community learning features and expert sessions</li>
          </ul>
        </section>

        {/* Team */}
        <section className="about-section">
          {/* <h2>Team</h2>
          <p>
            ZooLearn is developed by a dedicated team passionate about zoology,
            education, and technology.
          </p>
          <ul>
            <li>Zoology subject experts</li>
            <li>Content developers</li>
            <li>Academic reviewers</li>
            <li>Software developers</li>
            <li>Designers focused on educational clarity</li>
          </ul> */}
          <div className="team-header">
            <h1>Our Team</h1>
          </div>
          <div className="team-members">
            <div className="department">
              <h2>Founder</h2>
              <div className="team-profile">
                <div className="person" id="Pranav-Karthik">
                  <img loading="lazy" src="https://res.cloudinary.com/duibfmcw1/image/upload/v1769757696/WhatsApp_Image_2026-01-29_at_11.38.56_PM-removebg-preview_naa5tx.png"></img>
                  <h3>Pranav Karthik</h3>
                  <p>Founder</p>
                </div>
              </div>
            </div>
            <div className="department">
              <h2>Development Department</h2>
              <div className="team-profile">
                <div className="lead">
                  <div className="person" id="Vikram">
                    <img loading="lazy" src="https://res.cloudinary.com/duibfmcw1/image/upload/v1769757711/1710902792982_-_Vikram_A-removebg-preview_kwlbgr.png"></img>
                    <h3>Vikram</h3>
                    <p>Technical Lead</p>
                  </div>
                  <div className="person" id="Thomas-Jeberson">
                    <img loading="lazy" src="https://res.cloudinary.com/duibfmcw1/image/upload/v1769757695/thomas-removebg-preview_xpotrg.png"></img>
                    <h3>Thomas Jeberson</h3>
                    <p>Technical Lead</p>
                  </div>
                </div>
                <div className="member">
                  <div className="person" id="Vijai-Sharathi">
                    <img loading="lazy" src="https://res.cloudinary.com/duibfmcw1/image/upload/v1769709839/vijaiphoto-removebg-preview_oxwrkz.png"></img>
                    <h3>Vijai Sharathi</h3>
                    <p>Front-End Developer</p>
                  </div>
                  <div className="person" id="Kamesh">
                    <img loading="lazy" src="https://res.cloudinary.com/duibfmcw1/image/upload/v1769757696/kamesh-removebg-preview_vhyrpc.png"></img>
                    <h3>Kamesh</h3>
                    <p>Front-End Developer</p>
                  </div>
                  <div className="person" id="Charan">
                    <img loading="lazy" src="https://res.cloudinary.com/duibfmcw1/image/upload/v1769757698/44111459_-_charan_GD-removebg-preview_yjsljq.png"></img>
                    <h3>Charan</h3>
                    <p>Back-End Developer</p>
                  </div>
                  <div className="person" id="Satheeswaren">
                    <img loading="lazy" src="https://res.cloudinary.com/duibfmcw1/image/upload/v1769757698/IMG_20260119_215345_-_Sathees_Satheeswaran-removebg-preview_gofzcs.png"></img>
                    <h3>Satheeswaren</h3>
                    <p>Front-End Developer</p>
                  </div>
                  <div className="person" id="Vishnuputhiran">
                    <img loading="lazy" src="https://res.cloudinary.com/duibfmcw1/image/upload/v1769757697/1000037476_11zon_-_Vishnuputhran_Rajan-removebg-preview_tkvmnw.png"></img>
                    <h3>Vishnuputhiran</h3>
                    <p>Back-End Developer</p>
                  </div>
                </div>

              </div>
            </div>
            <div className="department">
              <h2>Research Department</h2>
              <div className="team-profile">
                <div className="lead">

                  <div className="person" id="Ahmed-Safnas">
                    <img loading="lazy" src="https://res.cloudinary.com/duibfmcw1/image/upload/v1769775276/PP-02.jpg-removebg-preview_gyx28w.png"></img>
                    <h3>Ahmed Safnas</h3>
                    <p>Research lead</p>
                  </div>
                </div>
                <div className="member">
                  <div className="person" id="Nethra-V">
                    <img loading="lazy" src="https://res.cloudinary.com/duibfmcw1/image/upload/v1769757697/IMG_20260129_153151_-_Nethra_V-removebg-preview_fuarx0.png"></img>
                    <h3>Nethra V</h3>
                    <p>Research Department</p>
                  </div>
                  <div className="person" id="Javith-ahmed">
                    <img loading="lazy" src="https://res.cloudinary.com/duibfmcw1/image/upload/v1769757695/javith_photo_-_Javith-removebg-preview_jldum5.png"></img>
                    <h3>Javith ahmed</h3>
                    <p>Research Department</p>
                  </div>
                  <div className="person" id="Srihari-varadhan">
                    <img loading="lazy" src="https://res.cloudinary.com/duibfmcw1/image/upload/v1769757697/Srihari_vardhan_Image_-_SRIHARI_VARDHAN_SRIRAM-removebg-preview_djteic.png"></img>
                    <h3>Srihari varadhan</h3>
                    <p>Research Department</p>
                  </div>

                  <div className="person" id="Boomani-Priyan">
                    <img loading="lazy" src="https://res.cloudinary.com/duibfmcw1/image/upload/v1769757696/IMG-20250527-WA0021_-_Boomani_Priyan-removebg-preview_lpphaq.png"></img>
                    <h3>Boomani Priyan</h3>
                    <p>Research Department</p>
                  </div>
                  <div className="person" id="Pavan-shankar">
                    <img loading="lazy" src="https://res.cloudinary.com/duibfmcw1/image/upload/v1769757696/IMG-20250401-WA0000_-_Pavan_Shankar-removebg-preview_zmnepq.png"></img>
                    <h3>Pavan shankar</h3>
                    <p>Research Department</p>
                  </div>
                  <div className="person" id="Nishanth-M">
                    <img loading="lazy" src="https://res.cloudinary.com/duibfmcw1/image/upload/v1765947727/logopng_2_webaac.png"></img>
                    <h3>Nishanth M</h3>
                    <p>Research Department</p>
                  </div>
                  <div className="person" id="Khurab-F">
                    <img loading="lazy" src="https://res.cloudinary.com/duibfmcw1/image/upload/v1765947727/logopng_2_webaac.png"></img>
                    <h3>Khurab F</h3>
                    <p>Research Department</p>
                  </div>
                  <div className="person" id="Aslam-sheriff">
                    <img loading="lazy" src="https://res.cloudinary.com/duibfmcw1/image/upload/v1765947727/logopng_2_webaac.png"></img>
                    <h3>Aslam sheriff</h3>
                    <p>Research Department</p>
                  </div>
                </div>

              </div>
            </div>
            <div className="department">
              <h2>Design Department</h2>
              <div className="team-profile">
                <div className="member">
                  <div className="person" id="Vijayakarthikmukilan">
                    <img loading="lazy" src="https://res.cloudinary.com/duibfmcw1/image/upload/v1765947727/logopng_2_webaac.png"></img>
                    <h3>Vijayakarthikmukilan</h3>
                    <p>UI/UX Designer</p>
                  </div>
                  <div className="person" id="Amirtharaj">
                    <img loading="lazy" src="https://res.cloudinary.com/duibfmcw1/image/upload/v1770016570/amirtharaj-removebg-preview_nhyhyp.png"></img>
                    <h3>Amirtharaj</h3>
                    <p>3D Head</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </section>

        {/* Careers */}
        <section className="about-section">
          <h2>Careers</h2>
          <p>
            ZooLearn offers opportunities for individuals who want to contribute
            to the future of science education.
          </p>
          <ul>
            <li>Zoology and life science content development</li>
            <li>Educational research and curriculum planning</li>
            <li>Software development and platform engineering</li>
            <li>AI and educational technology</li>
            <li>Scientific illustration and academic design</li>
          </ul>
        </section>

        {/* Press Kit */}
        <section className="about-section">
          <h2>Press Kit</h2>
          <p>
            The ZooLearn Press Kit provides official information for media,
            educators, collaborators, and partners.
          </p>
          <ul>
            <li>Platform overview and academic focus</li>
            <li>Current content coverage and future roadmap</li>
            <li>Brand descriptions and usage details</li>
            <li>Media and contact information</li>
          </ul>
        </section>
      </div>

    </>
  );
};

export default About;