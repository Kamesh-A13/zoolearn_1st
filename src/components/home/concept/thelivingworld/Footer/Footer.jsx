import './Footer.css'

function Footer() {

  return (
    <>
    <div className='foo-main-section'>
      <section className='foo-footer-section'>
        <div className='foo-head'>
          <div className='foo-logo-container'>
            <img src="https://res.cloudinary.com/duibfmcw1/image/upload/v1765947727/logopng_2_webaac.png" alt="ZooLearn Logo"></img>
            <h1>ZooLearn</h1>
          </div>
          <div className='foo-tagline'>
            <h2>Interactive zoology learning platform designed for school students and NEET aspirants. Master biology concepts through gamified quizzes, 3D models, and visual taxonomy trees.</h2>
          </div>
        </div>
        <div className='foo-footer-content'>
          <div className='foo-content-options'>
            <div className='foo-about'>
              <h1>About</h1>
              <ul>
                <li>About ZooLearn</li>
                <li>Our Mission</li>
                <li>Team</li>
                <li>Careers</li>
                <li>Press kit</li>
              </ul>
            </div>
            <div className='foo-resources'>
              <h1>Resources</h1>
              <ul>
                <li>FAQ</li>
                <li>Blog</li>
                <li>Study Guides</li>
                <li>Video Tutorials</li>
                <li>Community</li>
              </ul>
            </div>
            <div className='foo-legal'>
              <h1>Legal</h1>
              <ul>
                <li>Privacy Policy</li>
                <li>Terms of Services</li>
                <li>Cookie Policy</li>
                <li>Contact</li>
                <li>Support</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className='foo-copyright'>
        <p>© 2025 ZooLearn. All rights reserved.</p>
      </section>
    </div>
    </>
  )
}

export default Footer;