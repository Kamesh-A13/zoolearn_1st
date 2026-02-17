import "./parasiticAdaptations.css";

const ParasiticAdaptations = () => {
  const adaptations = [
    {
      icon: '🦷',
      title: 'Jaws with Teeth',
      desc: 'Three muscular jaws, each bearing 60–100 minute teeth arranged in a semicircle. These create a clean, Y-shaped incision on the host\'s skin for efficient blood extraction.',
      category: 'Feeding'
    },
    {
      icon: '💧',
      title: 'Hirudin Secretion',
      desc: 'Salivary glands secrete hirudin — a powerful anticoagulant that prevents blood clotting at the wound site. It also contains a vasodilator to increase blood flow and an anaesthetic for painless biting.',
      category: 'Chemical'
    },
    {
      icon: '🔗',
      title: 'Powerful Suckers',
      desc: 'Two muscular suckers (anterior + posterior) provide extremely firm attachment to the host, even in flowing water. The posterior sucker can support the entire body weight.',
      category: 'Attachment'
    },
    {
      icon: '😴',
      title: 'Painless Bite',
      desc: 'The anaesthetic substance in saliva ensures the host feels no pain during attachment and feeding — allowing the leech to feed undetected for extended periods.',
      category: 'Stealth'
    },
    {
      icon: '📦',
      title: 'Enormous Blood Storage',
      desc: 'The 10-chambered crop with lateral caeca can store blood weighing up to 5 times the leech\'s body weight. A single meal sustains the leech for 6–18 months.',
      category: 'Storage'
    },
    {
      icon: '🐛',
      title: 'Streamlined Body',
      desc: 'Complete absence of setae, parapodia, or any external projections. The smooth, slimy body ensures seamless attachment without snagging on host tissue.',
      category: 'Structure'
    },
    {
      icon: '👁️',
      title: 'Keen Sensory Organs',
      desc: '5 pairs of eyes detect light/shadow changes. Annular and segmental receptors sense vibrations and chemical cues from potential hosts in water.',
      category: 'Detection'
    },
    {
      icon: '🧬',
      title: 'Hermaphroditism',
      desc: 'Being hermaphroditic increases reproductive success — any two individuals of the species can mate, doubling the chances of finding a partner in aquatic habitats.',
      category: 'Reproduction'
    }
  ];

  return (
    <section className="para-section">
      <div className="para-container">
        
        <div className="para-header">
          <h2 className="para-title">Parasitic Adaptations</h2>
          <p className="para-intro">
            <em>Hirudinaria granulosa</em> is an <strong>obligate ectoparasite</strong> — its anatomy, physiology,
            and behaviour are extensively modified for a blood-feeding lifestyle. Here are the key adaptations:
          </p>
        </div>

        {/* ADAPTATION GRID */}
        <div className="para-grid">
          {adaptations.map((item, idx) => (
            <div
              key={idx}
              className="para-card"
              style={{ animationDelay: `${idx * 0.06}s` }}
            >
              <div className="para-card-top">
                <span className="para-card-icon">{item.icon}</span>
                <span className="para-card-badge">{item.category}</span>
              </div>
              <strong className="para-card-title">{item.title}</strong>
              <p className="para-card-desc">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* MEDICAL */}
        <div className="para-medical-card">
          <div className="para-medical-accent"></div>
          <h3 className="para-medical-title">🏥 Hirudotherapy — Leech Therapy in Modern Medicine</h3>
          <p className="para-medical-text">
            The very adaptations that make leeches effective parasites also make them invaluable in medicine:
          </p>
          <div className="para-medical-grid">
            <div className="para-medical-item">
              <strong>Microsurgery</strong>
              <p>Applied after reattachment surgery to relieve venous congestion by draining excess blood from reattached tissues.</p>
            </div>
            <div className="para-medical-item">
              <strong>Anti-inflammatory</strong>
              <p>Hirudin and other salivary compounds reduce inflammation, making leeches useful in treating arthritis and joint pain.</p>
            </div>
            <div className="para-medical-item">
              <strong>Blood Thinning</strong>
              <p>Hirudin is used pharmaceutically as a model for synthetic anticoagulant drugs used in treating cardiovascular conditions.</p>
            </div>
          </div>
        </div>

        {/* QUICK REVISION */}
        <div className="para-revision-card">
          <h4 className="para-revision-title">📋 Quick Revision — 8 Key Adaptations</h4>
          <ol className="para-revision-list">
            {adaptations.map((item, i) => (
              <li key={i}><strong>{item.title}</strong> — {item.category.toLowerCase()} adaptation</li>
            ))}
          </ol>
        </div>

      </div>
    </section>
  );
};

export default ParasiticAdaptations;