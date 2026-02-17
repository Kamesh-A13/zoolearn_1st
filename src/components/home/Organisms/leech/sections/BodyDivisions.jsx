import "./bodyDivisions.css";

const BodyDivisions = () => {
  const regions = [
    {
      name: "Cephalic region",
      segments: "1–5",
      desc: "Bears 5 pairs of eyes, the anterior sucker, and the mouth. Houses the brain (cerebral ganglia) and sensory receptors for detecting light, touch, and chemical stimuli from the host.",
      organs: "Eyes, Mouth, Brain",
      color: "#e11d48"
    },
    {
      name: "Pre-clitellar region",
      segments: "6–8",
      desc: "A narrow transitional zone containing the muscular pharynx and its associated salivary glands that secrete hirudin — the anticoagulant that prevents blood clotting.",
      organs: "Pharynx, Salivary glands",
      color: "#f59e0b"
    },
    {
      name: "Clitellar region",
      segments: "9–11",
      desc: "The reproductive hub. Contains male (10th seg) and female (11th seg) genital pores. The clitellum secretes the cocoon (ootheca) during reproduction.",
      organs: "Gonads, Clitellum",
      color: "#ea580c"
    },
    {
      name: "Middle region",
      segments: "12–22",
      desc: "The longest part of the body housing the crop (blood storage), intestine for digestion, 11 pairs of testes, and 17 pairs of nephridia for excretion.",
      organs: "Crop, Testes, Nephridia",
      color: "#16a34a"
    },
    {
      name: "Caudal region",
      segments: "23–26",
      desc: "The posterior body region containing the rectum, anus (dorsal side of 26th segment), and the terminal part of the ventral nerve cord.",
      organs: "Rectum, Anus",
      color: "#0d9488"
    },
    {
      name: "Posterior sucker",
      segments: "27–33",
      desc: "Formed by the fusion of the last seven segments into a large, powerful disc-shaped sucker. Functions as the primary anchor during feeding and the fixed pivot point during looping locomotion.",
      organs: "Sucker disc",
      color: "#4f46e5"
    }
  ];

  return (
    <section className="bd-divisions-section">
      <div className="bd-divisions-container">

        {/* HEADER */}
        <div className="bd-divisions-header">
          <h2 className="bd-divisions-title">Divisions of the Body</h2>
          <p className="bd-divisions-intro">
            The body of <em>Hirudinaria granulosa</em> is divided into <strong>six distinct regions</strong>,
            each specialized for specific functions. The 33 segments are grouped based on the organs they house.
          </p>
        </div>

        {/* SEGMENT SUMMARY BAR */}
        <div className="bd-segment-bar">
          {regions.map((region, idx) => {
            const segs = region.segments.split("–");
            const count = parseInt(segs[1]) - parseInt(segs[0]) + 1;
            const width = (count / 33) * 100;
            return (
              <div
                key={idx}
                className="bd-segment-block"
                style={{ width: `${width}%`, background: region.color }}
                title={`${region.name} (${region.segments})`}
              >
                <span className="bd-segment-block-label">{region.segments}</span>
              </div>
            );
          })}
        </div>

        {/* REGIONS TIMELINE */}
        <div className="bd-divisions-timeline">
          {regions.map((region, index) => (
            <div
              key={index}
              className="bd-timeline-card"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div className="bd-timeline-marker" style={{ background: region.color }}></div>
              <div className="bd-timeline-content">
                <div className="bd-card-top-row">
                  <span className="bd-segment-badge" style={{
                    background: `${region.color}10`,
                    color: region.color,
                    borderColor: `${region.color}30`
                  }}>Segments {region.segments}</span>
                  <span className="bd-organs-tag">{region.organs}</span>
                </div>
                <h3 className="bd-region-name">{region.name}</h3>
                <p className="bd-region-desc">{region.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className="bd-divisions-footer-box">
          <p className="bd-footer-text">
            <strong>Key Insight:</strong> The segmentation pattern in leeches is a classic example of <em>tagmatisation</em> —
            where body segments are grouped and specialized for different functions like feeding, reproduction, and locomotion.
          </p>
        </div>

      </div>
    </section>
  );
};

export default BodyDivisions;