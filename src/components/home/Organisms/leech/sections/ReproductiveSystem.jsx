import "./reproductiveSystem.css";

const ReproductiveSystem = () => {
  return (
    <section className="repro-section">
      <div className="repro-container">

        <div className="repro-header">
          <h2 className="repro-title">Reproductive System</h2>
        </div>

        {/* INTRO */}
        <div className="repro-card repro-intro">
          <div className="repro-card-accent"></div>
          <h3 className="repro-card-heading">Hermaphrodite — But Cross-fertilising</h3>
          <p className="repro-card-text">
            The leech is <strong>monoecious (hermaphrodite)</strong> — each individual possesses both
            male and female reproductive organs. However, <strong>self-fertilisation does not occur</strong>;
            two leeches must mate and exchange sperm (mutual insemination).
          </p>
          <div className="leech-callout leech-callout-fact" style={{ margin: '0.75rem 0 0' }}>
            <strong>🔑 Key Difference</strong>
            Although hermaphroditic, leeches always undergo <strong>cross-fertilisation</strong> — both
            partners simultaneously inseminate each other during copulation using spermatophores.
          </div>
        </div>

        {/* MALE & FEMALE SYSTEMS SIDE BY SIDE */}
        <div className="leech-grid-2">

          {/* MALE */}
          <div className="repro-system-card repro-male-card">
            <div className="repro-system-header">
              <span className="repro-system-icon">♂</span>
              <h3 className="repro-system-name">Male Reproductive System</h3>
            </div>
            <ul className="repro-organ-list">
              <li>
                <strong>Testis sacs:</strong> 11 pairs of spherical testes arranged segmentally
                in segments 12 to 22. Each testis is enclosed in a coelomic sac.
              </li>
              <li>
                <strong>Vasa deferentia:</strong> Short ducts from each testis converge into
                a pair of common sperm ducts (vas deferens) running along the ventral side.
              </li>
              <li>
                <strong>Ejaculatory duct:</strong> The two vasa deferentia unite to form a single
                muscular ejaculatory duct that leads to the male genital pore (10th segment).
              </li>
              <li>
                <strong>Prostate glands:</strong> Glands attached to the ejaculatory duct; secrete
                seminal fluid that nourishes and activates sperm.
              </li>
            </ul>
          </div>

          {/* FEMALE */}
          <div className="repro-system-card repro-female-card">
            <div className="repro-system-header">
              <span className="repro-system-icon">♀</span>
              <h3 className="repro-system-name">Female Reproductive System</h3>
            </div>
            <ul className="repro-organ-list">
              <li>
                <strong>Ovaries:</strong> A single pair of coiled, tubular ovaries located in the
                11th segment, enclosed in ovarian sacs.
              </li>
              <li>
                <strong>Oviducts:</strong> Short ducts arising from each ovary that merge
                into a common oviduct leading to the female genital pore (11th segment).
              </li>
              <li>
                <strong>Vagina:</strong> The terminal part of the common oviduct; opens to the exterior
                as the female genital pore.
              </li>
              <li>
                <strong>Albumen glands:</strong> Secrete nutritive material that is packed with the
                eggs during cocoon formation.
              </li>
            </ul>
          </div>
        </div>

        {/* REPRODUCTION & DEVELOPMENT */}
        <div className="repro-card">
          <h3 className="repro-card-heading">Copulation, Cocoon Formation & Development</h3>

          <div className="repro-process-grid">
            {[
              { num: '1', title: 'Copulation', desc: 'Two leeches align ventrally and exchange spermatophores through the male genital pore. Sperm is deposited near the partner\'s female pore.' },
              { num: '2', title: 'Fertilisation', desc: 'Sperm penetrates the body wall or enters the female pore to reach the ovaries. Fertilisation is internal.' },
              { num: '3', title: 'Cocoon Formation', desc: 'The clitellum (segments 9–11) secretes a tough, spongy cocoon (ootheca). Fertilised eggs + albumen are deposited inside before it hardens.' },
              { num: '4', title: 'Direct Development', desc: 'Unlike many annelids, there is no larval stage. Young leeches hatch directly from the cocoon as miniature adults after 2–4 weeks.' }
            ].map((step, i) => (
              <div key={i} className="repro-process-card">
                <div className="repro-process-num">{step.num}</div>
                <strong className="repro-process-title">{step.title}</strong>
                <p className="repro-process-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* IMAGE */}
        <div className="repro-image-frame">
          <img
            src="https://res.cloudinary.com/duibfmcw1/image/upload/v1767810768/reproductivesystem_yxzrpg.png"
            alt="Reproductive System of Leech"
            className="repro-img"
          />
          <span className="repro-img-caption">Figure: Reproductive System of <em>Hirudinaria</em></span>
        </div>

      </div>
    </section>
  );
};

export default ReproductiveSystem;
