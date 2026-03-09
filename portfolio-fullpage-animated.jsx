import { useState, useEffect, useRef, useCallback } from "react";

const SECTIONS = [
  { id: "hero", label: "Accueil", anim: "—" },
  { id: "about", label: "À propos", anim: "Fade + Slide Up" },
  { id: "competences", label: "Compétences", anim: "Scale Zoom" },
  { id: "webmaster", label: "Webmaster", anim: "Stagger Cascade" },
  { id: "automatisation", label: "Automatisation", anim: "Slide Horizontal" },
  { id: "seo", label: "SEO – GEO", anim: "Flip 3D" },
  { id: "photo-video", label: "Photo & Vidéo", anim: "Blur Reveal" },
  { id: "education", label: "Éducation", anim: "Typewriter Slide" },
  { id: "outils", label: "Outils", anim: "Parallax Depth" },
  { id: "contact", label: "Contact", anim: "Crossfade Cinematic" },
];

// ─── Animation Hook ──────────────────────────────────────
// Each section gets a visibility state triggered by IntersectionObserver.
// We also track "left" so animations can reset when scrolling away.
function useSectionVisible(threshold = 0.35) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting),
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// ─── Magnetic Orb (hero) ─────────────────────────────────
function MagneticOrb() {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  useEffect(() => {
    const h = (e) => setPos({ x: (e.clientX / window.innerWidth) * 100, y: (e.clientY / window.innerHeight) * 100 });
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      <div style={{
        position: "absolute", width: "55vw", height: "55vw", maxWidth: 650, maxHeight: 650,
        borderRadius: "50%", background: "radial-gradient(circle, rgba(200,170,120,0.1) 0%, transparent 70%)",
        left: `${pos.x}%`, top: `${pos.y}%`, transform: "translate(-50%, -50%)",
        transition: "left 1.8s cubic-bezier(0.16,1,0.3,1), top 1.8s cubic-bezier(0.16,1,0.3,1)",
        filter: "blur(50px)",
      }} />
    </div>
  );
}

// ─── Slide wrapper ───────────────────────────────────────
function Slide({ id, children, bg = "#0c0c0e", gradient, style: extra = {} }) {
  return (
    <section id={id} className="snap-slide" style={{
      height: "100vh", width: "100%", scrollSnapAlign: "start",
      display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden",
      background: gradient || bg, ...extra,
    }}>
      {children}
    </section>
  );
}

// ─── Dot Navigation ──────────────────────────────────────
function DotNav({ active, onNavigate }) {
  const [tip, setTip] = useState(null);
  return (
    <div style={{
      position: "fixed", right: 24, top: "50%", transform: "translateY(-50%)",
      zIndex: 200, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12,
    }} className="dot-nav">
      {SECTIONS.map((s, i) => (
        <div key={s.id} onMouseEnter={() => setTip(i)} onMouseLeave={() => setTip(null)}
          onClick={() => onNavigate(s.id)}
          style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}>
          <span style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: "0.1em",
            textTransform: "uppercase", color: "rgba(200,170,120,0.7)",
            opacity: tip === i ? 1 : 0, transform: tip === i ? "translateX(0)" : "translateX(8px)",
            transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)", pointerEvents: "none", whiteSpace: "nowrap",
          }}>{s.label}</span>
          <div style={{
            width: active === s.id ? 10 : 6, height: active === s.id ? 10 : 6,
            borderRadius: "50%", flexShrink: 0,
            background: active === s.id ? "#c8aa78" : "rgba(255,255,255,0.18)",
            border: active === s.id ? "none" : "1px solid rgba(255,255,255,0.08)",
            transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
            boxShadow: active === s.id ? "0 0 14px rgba(200,170,120,0.35)" : "none",
          }} />
        </div>
      ))}
    </div>
  );
}

// ─── Animation indicator badge ───────────────────────────
function AnimBadge({ label }) {
  return (
    <div style={{
      position: "absolute", top: 20, left: 28, zIndex: 10,
      padding: "5px 14px", background: "rgba(200,170,120,0.08)",
      border: "1px solid rgba(200,170,120,0.15)", fontFamily: "'DM Sans', sans-serif",
      fontSize: 10, letterSpacing: "0.1em", color: "rgba(200,170,120,0.6)",
      textTransform: "uppercase", fontWeight: 500,
    }}>
      ✦ {label}
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// SECTION 1: HERO — Cinematic entrance
// ══════════════════════════════════════════════════════════
function HeroSlide() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 200); }, []);
  const a = (d, s) => ({
    opacity: loaded ? 1 : 0, transform: loaded ? "none" : `translateY(${d}px)`,
    transition: `all 1.1s cubic-bezier(0.16,1,0.3,1) ${s}s`,
  });
  return (
    <Slide id="hero" gradient="linear-gradient(160deg, #0c0c0e 0%, #141418 40%, #0c0c0e 100%)">
      <MagneticOrb />
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }}>
        <div style={{ position: "absolute", top: "20%", left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(200,170,120,0.05), transparent)" }} />
      </div>
      <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 24px", maxWidth: 880 }}>
        <div style={{ ...a(16, 0.3), fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(200,170,120,0.55)", fontFamily: "'DM Sans', sans-serif", marginBottom: 24, fontWeight: 500 }}>Genève · Suisse</div>
        <h1 style={{ ...a(40, 0.5), fontFamily: "'Playfair Display', serif", fontSize: "clamp(40px, 7vw, 86px)", fontWeight: 400, color: "#fff", margin: 0, lineHeight: 1.05, letterSpacing: "-0.02em" }}>
          Thierry<br /><span style={{ color: "#c8aa78", fontStyle: "italic", fontWeight: 300 }}>Barbezat</span>
        </h1>
        <p style={{ ...a(24, 0.8), fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(15px, 1.8vw, 19px)", color: "rgba(255,255,255,0.4)", marginTop: 28, fontWeight: 300, lineHeight: 1.8 }}>
          Je rends les entreprises visibles —<br />
          <span style={{ color: "rgba(255,255,255,0.65)" }}>SEO · Automatisation IA · Stratégie Digitale</span>
        </p>
        <div style={{ ...a(16, 1.1), marginTop: 44, display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="#webmaster" className="cta-primary">Voir mes projets</a>
          <a href="#contact" className="cta-ghost">Me contacter →</a>
        </div>
      </div>
      <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", ...a(0, 1.6) }}>
        <div className="scroll-line" />
      </div>
    </Slide>
  );
}

// ══════════════════════════════════════════════════════════
// SECTION 2: ABOUT — Animation: FADE + SLIDE UP (classique)
// Les éléments apparaissent en glissant du bas vers le haut
// ══════════════════════════════════════════════════════════
function AboutSlide() {
  const [ref, vis] = useSectionVisible(0.3);
  const ease = "cubic-bezier(0.16,1,0.3,1)";
  const item = (i) => ({
    opacity: vis ? 1 : 0,
    transform: vis ? "translateY(0)" : "translateY(60px)",
    transition: `opacity 0.9s ${ease} ${0.1 + i * 0.12}s, transform 0.9s ${ease} ${0.1 + i * 0.12}s`,
  });
  return (
    <Slide id="about" bg="#0c0c0e">
      <AnimBadge label="Fade + Slide Up" />
      <div ref={ref} style={{ maxWidth: 1000, margin: "0 auto", display: "flex", gap: 64, alignItems: "center", flexWrap: "wrap", padding: "0 40px" }}>
        <div style={{ flex: "1 1 280px", ...item(0) }}>
          <div style={{ position: "relative", maxWidth: 320, margin: "0 auto" }}>
            <div style={{ width: "100%", aspectRatio: "3/4", background: "linear-gradient(135deg, #1a1a1e, #222228)", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display', serif", fontSize: 72, color: "rgba(200,170,120,0.07)", fontStyle: "italic" }}>TB</div>
              <div style={{ position: "absolute", bottom: 20, left: 20, right: 20, height: 1, background: "rgba(200,170,120,0.15)" }} />
            </div>
            <div style={{ position: "absolute", top: 14, left: 14, right: -14, bottom: -14, border: "1px solid rgba(200,170,120,0.1)", zIndex: -1 }} />
          </div>
        </div>
        <div style={{ flex: "1 1 380px" }}>
          <div style={item(1)}><div className="overline">À propos</div></div>
          <h2 style={{ ...item(2), fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 3.5vw, 38px)", color: "#fff", fontWeight: 400, margin: "0 0 24px", lineHeight: 1.2 }}>
            10+ ans à transformer<br /><span className="accent-italic">la visibilité digitale</span>
          </h2>
          <p style={{ ...item(3), fontFamily: "'DM Sans', sans-serif", fontSize: 14, lineHeight: 1.85, color: "rgba(255,255,255,0.42)", margin: "0 0 14px", fontWeight: 300 }}>
            Expert digital avec un DAS en Communication Digitale de l'Université de Genève. J'allie vision stratégique, rigueur technique et approche business.
          </p>
          <p style={{ ...item(4), fontFamily: "'DM Sans', sans-serif", fontSize: 14, lineHeight: 1.85, color: "rgba(255,255,255,0.3)", margin: "0 0 28px", fontWeight: 300 }}>
            Mon background en électronique (CFC CERN) et en management m'a donné une rigueur opérationnelle unique.
          </p>
          <div style={{ ...item(5), display: "flex", gap: 44, flexWrap: "wrap" }}>
            {[{ n: "10+", l: "ans d'expérience" }, { n: "40%", l: "augmentation leads" }, { n: "x10", l: "trafic organique" }].map((s, i) => (
              <div key={i}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, color: "#c8aa78", fontWeight: 300, lineHeight: 1 }}>{s.n}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: "rgba(255,255,255,0.28)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 6 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Slide>
  );
}

// ══════════════════════════════════════════════════════════
// SECTION 3: COMPÉTENCES — Animation: SCALE ZOOM
// Les cartes apparaissent en partant de scale(0) vers scale(1)
// ══════════════════════════════════════════════════════════
function CompetencesSlide() {
  const [ref, vis] = useSectionVisible(0.3);
  const [hov, setHov] = useState(null);
  const ease = "cubic-bezier(0.34,1.56,0.64,1)";
  const items = [
    { icon: "◈", title: "Web", desc: "Sites sur mesure, e-commerce, intégrations", link: "webmaster" },
    { icon: "⬡", title: "Automatisation", desc: "Workflows IA, agents intelligents, n8n & Make", link: "automatisation" },
    { icon: "◎", title: "SEO – GEO", desc: "Visibilité Google & IA génératives", link: "seo" },
    { icon: "▣", title: "Photo & Vidéo", desc: "Captation, montage, production de contenu", link: "photo-video" },
    { icon: "◇", title: "Marketing", desc: "Stratégie digitale, analytics, KPI", link: "contact" },
  ];
  return (
    <Slide id="competences" gradient="linear-gradient(180deg, #0c0c0e 0%, #111114 100%)">
      <AnimBadge label="Scale Zoom" />
      <div ref={ref} style={{ maxWidth: 1000, padding: "0 40px", width: "100%" }}>
        <div style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(30px)", transition: `all 0.7s ${ease} 0s` }}>
          <div className="overline">Compétences</div>
        </div>
        <h2 style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(30px)", transition: `all 0.7s ${ease} 0.1s`, fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 3.5vw, 38px)", color: "#fff", fontWeight: 400, margin: "0 0 48px", lineHeight: 1.2 }}>
          Mes domaines <span className="accent-italic">d'expertise</span>
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))", gap: 16 }}>
          {items.map((item, i) => (
            <a key={i} href={`#${item.link}`}
              onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}
              style={{
                display: "block", padding: "28px 22px", textDecoration: "none",
                background: hov === i ? "rgba(200,170,120,0.06)" : "rgba(255,255,255,0.015)",
                border: `1px solid ${hov === i ? "rgba(200,170,120,0.2)" : "rgba(255,255,255,0.05)"}`,
                // SCALE animation
                opacity: vis ? 1 : 0,
                transform: vis ? "scale(1)" : "scale(0.3)",
                transition: `opacity 0.6s ${ease} ${0.15 + i * 0.08}s, transform 0.6s ${ease} ${0.15 + i * 0.08}s, background 0.3s, border-color 0.3s`,
              }}>
              <div style={{ fontSize: 24, color: "#c8aa78", marginBottom: 14, opacity: hov === i ? 1 : 0.5, transition: "opacity 0.3s" }}>{item.icon}</div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, color: "#fff", marginBottom: 8, fontWeight: 400 }}>{item.title}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.35)", lineHeight: 1.6, fontWeight: 300 }}>{item.desc}</div>
            </a>
          ))}
        </div>
      </div>
    </Slide>
  );
}

// ══════════════════════════════════════════════════════════
// SECTION 4: WEBMASTER — Animation: STAGGER CASCADE
// Les cartes tombent l'une après l'autre comme un jeu de cartes
// ══════════════════════════════════════════════════════════
function WebmasterSlide() {
  const [ref, vis] = useSectionVisible(0.25);
  const [hp, setHp] = useState(null);
  const projects = [
    { name: "Socafid", type: "Vitrine", tag: "Fiduciaire · Genève", c: "#2a3a4a" },
    { name: "Be Store Outlet", type: "E-commerce", tag: "Top 3 Google", c: "#3a2a2a" },
    { name: "PHP Santé", type: "B2B", tag: "Position 0 Google", c: "#2a3a2a" },
    { name: "Digital Foundation", type: "Vitrine", tag: "Fondation · Suisse", c: "#3a3a2a" },
    { name: "Appartement Nendaz", type: "Vitrine", tag: "Cité #1 par ChatGPT", c: "#2a2a3a" },
    { name: "ProStore PHP Santé", type: "E-commerce B2B", tag: "Plateforme pro", c: "#3a2a3a" },
  ];
  return (
    <Slide id="webmaster" bg="#0c0c0e">
      <AnimBadge label="Stagger Cascade" />
      <div ref={ref} style={{ maxWidth: 1060, padding: "0 40px", width: "100%" }}>
        <div style={{ opacity: vis ? 1 : 0, transition: "opacity 0.6s 0s" }}>
          <div className="overline">Webmaster · Web Designer · Web Developer</div>
        </div>
        <h2 style={{ opacity: vis ? 1 : 0, transition: "opacity 0.6s 0.05s", fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 3.5vw, 38px)", color: "#fff", fontWeight: 400, margin: "0 0 12px", lineHeight: 1.2 }}>
          Projets <span className="accent-italic">sélectionnés</span>
        </h2>
        <p style={{ opacity: vis ? 1 : 0, transition: "opacity 0.5s 0.1s", fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.35)", marginBottom: 32, fontWeight: 300, maxWidth: 550 }}>
          Sites vitrines, e-commerce, intégrations CRM/ERP — de la maquette au déploiement.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
          {projects.map((p, i) => (
            <div key={i} onMouseEnter={() => setHp(i)} onMouseLeave={() => setHp(null)}
              style={{
                position: "relative", aspectRatio: "16/10", overflow: "hidden", cursor: "pointer",
                background: `linear-gradient(135deg, ${p.c}, #0c0c0e)`,
                // CASCADE: each card drops from above with increasing delay + slight rotation
                opacity: vis ? 1 : 0,
                transform: vis ? "translateY(0) rotate(0deg)" : `translateY(-80px) rotate(${i % 2 === 0 ? -3 : 3}deg)`,
                transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${0.12 + i * 0.1}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${0.12 + i * 0.1}s`,
              }}>
              <div style={{
                position: "absolute", inset: 0,
                background: hp === i ? "linear-gradient(to top, rgba(12,12,14,0.95), rgba(12,12,14,0.2))" : "linear-gradient(to top, rgba(12,12,14,0.88), rgba(12,12,14,0.5))",
                transition: "all 0.4s",
              }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 22 }}>
                <div style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "#c8aa78", fontFamily: "'DM Sans', sans-serif", marginBottom: 5, fontWeight: 500, opacity: 0.7 }}>{p.type}</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 19, color: "#fff", fontWeight: 400, marginBottom: 4 }}>{p.name}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.32)", fontWeight: 300 }}>{p.tag}</div>
              </div>
              <div style={{ position: "absolute", top: 18, right: 18, color: "#c8aa78", fontSize: 18, opacity: hp === i ? 1 : 0, transform: hp === i ? "none" : "translate(-6px,6px)", transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)" }}>↗</div>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
}

// ══════════════════════════════════════════════════════════
// SECTION 5: AUTOMATISATION — Animation: SLIDE HORIZONTAL
// Les deux colonnes arrivent des côtés opposés
// ══════════════════════════════════════════════════════════
function AutomatisationSlide() {
  const [ref, vis] = useSectionVisible(0.3);
  const ease = "cubic-bezier(0.16,1,0.3,1)";
  return (
    <Slide id="automatisation" gradient="linear-gradient(160deg, #0c0c0e 0%, #12121a 100%)">
      <AnimBadge label="Slide Horizontal" />
      <div ref={ref} style={{ maxWidth: 900, padding: "0 40px", width: "100%" }}>
        <div style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(20px)", transition: `all 0.7s ${ease} 0s` }}><div className="overline">Automatisation & Agents IA</div></div>
        <h2 style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(20px)", transition: `all 0.7s ${ease} 0.08s`, fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 3.5vw, 38px)", color: "#fff", fontWeight: 400, margin: "0 0 36px", lineHeight: 1.2 }}>
          Des processus <span className="accent-italic">intelligents</span>
        </h2>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          {/* LEFT column slides in from left */}
          <div style={{
            flex: "1 1 340px",
            opacity: vis ? 1 : 0,
            transform: vis ? "translateX(0)" : "translateX(-120px)",
            transition: `all 0.9s ${ease} 0.15s`,
          }}>
            <div className="glass-card">
              <div style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "#c8aa78", fontFamily: "'DM Sans', sans-serif", marginBottom: 14, fontWeight: 500 }}>Expertise</div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.85, fontWeight: 300, margin: "0 0 20px" }}>
                Solutions basées sur des agents IA avec <strong style={{ color: "rgba(255,255,255,0.65)", fontWeight: 500 }}>n8n</strong> et <strong style={{ color: "rgba(255,255,255,0.65)", fontWeight: 500 }}>Make</strong>.
              </p>
              {["Génération & gestion des leads", "Gestion automatisée réseaux sociaux", "Facturation et envoi automatique", "Service client & support IA", "Onboarding clients automatisé"].map((t, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#c8aa78", opacity: 0.5, flexShrink: 0 }} />
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.38)", fontWeight: 300 }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
          {/* RIGHT column slides in from right */}
          <div style={{
            flex: "1 1 340px", display: "flex", flexDirection: "column", gap: 16,
            opacity: vis ? 1 : 0,
            transform: vis ? "translateX(0)" : "translateX(120px)",
            transition: `all 0.9s ${ease} 0.25s`,
          }}>
            <div className="glass-card">
              <div style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "#c8aa78", fontFamily: "'DM Sans', sans-serif", marginBottom: 10, fontWeight: 500 }}>Projet — Génération de blog</div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.38)", lineHeight: 1.7, fontWeight: 300, margin: 0 }}>
                Pipeline n8n : scraping SERP, analyse vectorielle, génération SEO par 3 agents IA, humanisation du contenu.
              </p>
            </div>
            <div className="glass-card">
              <div style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "#c8aa78", fontFamily: "'DM Sans', sans-serif", marginBottom: 10, fontWeight: 500 }}>Projet — Audit SEO automatisé</div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.38)", lineHeight: 1.7, fontWeight: 300, margin: 0 }}>
                Agent IA sur n8n : analyse automatique d'une page web et rapport d'audit SEO complet.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Slide>
  );
}

// ══════════════════════════════════════════════════════════
// SECTION 6: SEO – GEO — Animation: FLIP 3D
// Les cartes font un flip en 3D pour se révéler
// ══════════════════════════════════════════════════════════
function SeoSlide() {
  const [ref, vis] = useSectionVisible(0.3);
  const results = [
    { metric: "x10", desc: "De 500 à 5'000 visites organiques/mois en < 1 an, +40% de leads.", client: "Entreprise locale · Genève" },
    { metric: "Top 3", desc: "Google sur « Cosmétiques pas cher » et « Parfums pas cher ».", client: "Be Store Outlet" },
    { metric: "Pos. 0", desc: "Google sur « Peeling professionnels aux acides de fruits ».", client: "PHP Santé · B2B" },
    { metric: "#1 LLM", desc: "Cité en 1ère position par ChatGPT — réussite GEO pionnière en Suisse.", client: "Appartement Nendaz" },
  ];
  return (
    <Slide id="seo" bg="#0c0c0e" style={{ perspective: "1200px" }}>
      <AnimBadge label="Flip 3D" />
      <div ref={ref} style={{ maxWidth: 920, padding: "0 40px", width: "100%" }}>
        <div style={{ opacity: vis ? 1 : 0, transition: "opacity 0.6s 0s" }}><div className="overline">SEO – GEO</div></div>
        <h2 style={{ opacity: vis ? 1 : 0, transition: "opacity 0.6s 0.05s", fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 3.5vw, 38px)", color: "#fff", fontWeight: 400, margin: "0 0 14px", lineHeight: 1.2 }}>
          Les chiffres <span className="accent-italic">parlent</span>
        </h2>
        <p style={{ opacity: vis ? 1 : 0, transition: "opacity 0.5s 0.1s", fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.3)", marginBottom: 40, fontWeight: 300, fontStyle: "italic", maxWidth: 540 }}>
          « Un beau site mal référencé, c'est une vitrine splendide… au fond d'une ruelle déserte. »
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: 16 }}>
          {results.map((r, i) => (
            <div key={i} style={{
              // FLIP 3D
              opacity: vis ? 1 : 0,
              transform: vis ? "rotateY(0deg)" : "rotateY(90deg)",
              transition: `opacity 0.5s cubic-bezier(0.16,1,0.3,1) ${0.15 + i * 0.12}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${0.15 + i * 0.12}s`,
              transformOrigin: "left center",
            }}>
              <div className="result-card">
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: "#c8aa78", fontWeight: 300, marginBottom: 16, lineHeight: 1 }}>{r.metric}</div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.42)", lineHeight: 1.7, fontWeight: 300, flex: 1, margin: 0 }}>{r.desc}</p>
                <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.05)", fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: "rgba(200,170,120,0.4)", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 500 }}>{r.client}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
}

// ══════════════════════════════════════════════════════════
// SECTION 7: PHOTO & VIDÉO — Animation: BLUR REVEAL
// Le contenu apparaît en passant de flou à net
// ══════════════════════════════════════════════════════════
function PhotoVideoSlide() {
  const [ref, vis] = useSectionVisible(0.3);
  const blur = (i) => ({
    opacity: vis ? 1 : 0,
    filter: vis ? "blur(0px)" : "blur(18px)",
    transform: vis ? "scale(1)" : "scale(1.04)",
    transition: `all 1s cubic-bezier(0.16,1,0.3,1) ${0.1 + i * 0.15}s`,
  });
  return (
    <Slide id="photo-video" gradient="linear-gradient(160deg, #0c0c0e 0%, #15131a 100%)">
      <AnimBadge label="Blur Reveal" />
      <div ref={ref} style={{ maxWidth: 800, padding: "0 40px", width: "100%" }}>
        <div style={blur(0)}><div className="overline">Photo & Vidéo</div></div>
        <h2 style={{ ...blur(0.5), fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 3.5vw, 38px)", color: "#fff", fontWeight: 400, margin: "0 0 36px", lineHeight: 1.2 }}>
          Contenus <span className="accent-italic">visuels</span>
        </h2>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          <div style={{ ...blur(1), flex: "1 1 300px" }}>
            <div className="glass-card">
              <div style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "#c8aa78", fontFamily: "'DM Sans', sans-serif", marginBottom: 16, fontWeight: 500 }}>Services</div>
              {["Planification & organisation du set", "Captation photo et vidéo", "Montage vidéo (DaVinci Resolve)", "Retouche photo (Affinity Photo)", "Production pour réseaux sociaux"].map((t, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#c8aa78", opacity: 0.5, flexShrink: 0 }} />
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.4)", fontWeight: 300 }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ ...blur(2), flex: "1 1 300px" }}>
            <div className="glass-card">
              <div style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "#c8aa78", fontFamily: "'DM Sans', sans-serif", marginBottom: 10, fontWeight: 500 }}>Projet — Rencontres Inspirantes</div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.7, fontWeight: 300, margin: "0 0 14px" }}>
                Couverture événementielle pour Digitalizers — renforcement de la notoriété IA sur la place genevoise.
              </p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["1 vidéo globale", "5 capsules réseaux", "↑ abonnés LinkedIn"].map((t, i) => (
                  <span key={i} className="tag">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Slide>
  );
}

// ══════════════════════════════════════════════════════════
// SECTION 8: ÉDUCATION — Animation: TYPEWRITER SLIDE
// Les lignes apparaissent une par une avec un effet de reveal
// ══════════════════════════════════════════════════════════
function EducationSlide() {
  const [ref, vis] = useSectionVisible(0.3);
  const edu = [
    { logo: "UNI", title: "DAS Communication Digitale", sub: "Expertise web et réseaux sociaux", org: "Université de Genève" },
    { logo: "CAD", title: "Community Management", sub: "& Brand Content", org: "CADSchool · Genève" },
    { logo: "n8n", title: "Formation n8n", sub: "Level 1 & Level 2", org: "n8n Academy" },
    { logo: "M", title: "Formation Make", sub: "Basics → Advanced", org: "Make Academy" },
    { logo: "CERN", title: "CFC Électronicien", sub: "Procédés de test & mesure", org: "CERN Genève" },
  ];
  return (
    <Slide id="education" bg="#0c0c0e">
      <AnimBadge label="Typewriter Slide" />
      <div ref={ref} style={{ maxWidth: 900, padding: "0 40px", width: "100%" }}>
        <div style={{ opacity: vis ? 1 : 0, transition: "opacity 0.5s 0s" }}><div className="overline">Formation</div></div>
        <h2 style={{ opacity: vis ? 1 : 0, transition: "opacity 0.5s 0.05s", fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 3.5vw, 38px)", color: "#fff", fontWeight: 400, margin: "0 0 44px", lineHeight: 1.2 }}>
          Parcours <span className="accent-italic">académique</span>
        </h2>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {edu.map((e, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 20, padding: "18px 0",
              borderTop: "1px solid rgba(255,255,255,0.04)",
              ...(i === edu.length - 1 ? { borderBottom: "1px solid rgba(255,255,255,0.04)" } : {}),
              // TYPEWRITER: each row clips in from left with a width reveal
              opacity: vis ? 1 : 0,
              clipPath: vis ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
              transition: `opacity 0.4s cubic-bezier(0.16,1,0.3,1) ${0.15 + i * 0.13}s, clip-path 0.8s cubic-bezier(0.16,1,0.3,1) ${0.15 + i * 0.13}s`,
            }}>
              <div style={{
                width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center",
                background: "rgba(200,170,120,0.06)", border: "1px solid rgba(200,170,120,0.1)",
                fontFamily: "'Playfair Display', serif", fontSize: 13, color: "#c8aa78", fontWeight: 500, fontStyle: "italic", flexShrink: 0,
              }}>{e.logo}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, color: "#fff", fontWeight: 400 }}>{e.title}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.3)", fontWeight: 300, marginTop: 2 }}>{e.sub}</div>
              </div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "rgba(200,170,120,0.4)", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 500, textAlign: "right", flexShrink: 0 }}>{e.org}</div>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
}

// ══════════════════════════════════════════════════════════
// SECTION 9: OUTILS — Animation: PARALLAX DEPTH
// Les catégories arrivent à des vitesses et profondeurs différentes
// ══════════════════════════════════════════════════════════
function OutilsSlide() {
  const [ref, vis] = useSectionVisible(0.25);
  const categories = [
    { label: "CMS & E-commerce", tools: ["WordPress", "WooCommerce", "PrestaShop"] },
    { label: "Automatisation", tools: ["n8n", "Make", "Notion", "Airtable"] },
    { label: "Analytics & SEO", tools: ["Google Analytics", "Search Console", "SEMrush", "Screaming Frog", "Ubersuggest"] },
    { label: "Création", tools: ["Affinity Designer", "Affinity Photo", "Affinity Publisher", "DaVinci Resolve"] },
    { label: "CRM & Mailing", tools: ["Salesforce", "Mailchimp"] },
    { label: "Suite Office", tools: ["Microsoft Office", "Adobe Suite"] },
  ];
  // Each card starts from a different Y offset and scale — parallax effect
  const depths = [100, 60, 130, 80, 110, 70];
  const scales = [0.85, 0.9, 0.82, 0.88, 0.84, 0.92];
  return (
    <Slide id="outils" gradient="linear-gradient(180deg, #0c0c0e 0%, #111114 100%)">
      <AnimBadge label="Parallax Depth" />
      <div ref={ref} style={{ maxWidth: 900, padding: "0 40px", width: "100%" }}>
        <div style={{ opacity: vis ? 1 : 0, transition: "opacity 0.5s 0s" }}><div className="overline">Outils informatiques</div></div>
        <h2 style={{ opacity: vis ? 1 : 0, transition: "opacity 0.5s 0.05s", fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 3.5vw, 38px)", color: "#fff", fontWeight: 400, margin: "0 0 44px", lineHeight: 1.2 }}>
          Stack <span className="accent-italic">technique</span>
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 16 }}>
          {categories.map((cat, i) => (
            <div key={i} style={{
              padding: "22px 24px", background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.04)",
              // PARALLAX: different origin offsets per card
              opacity: vis ? 1 : 0,
              transform: vis ? "translateY(0) scale(1)" : `translateY(${depths[i]}px) scale(${scales[i]})`,
              transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${0.05 + i * 0.07}s, transform 1s cubic-bezier(0.16,1,0.3,1) ${0.05 + i * 0.07}s`,
            }}>
              <div style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "#c8aa78", fontFamily: "'DM Sans', sans-serif", marginBottom: 12, fontWeight: 500 }}>{cat.label}</div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {cat.tools.map((t, j) => (
                  <span key={j} className="tag">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
}

// ══════════════════════════════════════════════════════════
// SECTION 10: CONTACT — Animation: CROSSFADE CINEMATIC
// Fondu progressif ligne par ligne avec un léger scale
// ══════════════════════════════════════════════════════════
function ContactSlide() {
  const [ref, vis] = useSectionVisible(0.3);
  const ease = "cubic-bezier(0.16,1,0.3,1)";
  const line = (i) => ({
    opacity: vis ? 1 : 0,
    transform: vis ? "scale(1)" : "scale(0.92)",
    filter: vis ? "blur(0px)" : "blur(6px)",
    transition: `all 1.1s ${ease} ${0.2 + i * 0.18}s`,
  });
  return (
    <Slide id="contact" bg="#0c0c0e">
      <AnimBadge label="Crossfade Cinematic" />
      <div ref={ref} style={{ maxWidth: 680, margin: "0 auto", textAlign: "center", padding: "0 24px" }}>
        <div style={line(0)}><div className="overline">Contact</div></div>
        <h2 style={{ ...line(1), fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px, 5vw, 50px)", color: "#fff", fontWeight: 400, margin: "0 0 18px", lineHeight: 1.15 }}>
          Créons quelque chose<br /><span className="accent-italic">d'exceptionnel</span>
        </h2>
        <p style={{ ...line(2), fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.32)", marginBottom: 44, fontWeight: 300, lineHeight: 1.7 }}>
          Projet ponctuel ou collaboration à long terme — je suis ouvert à échanger sur vos besoins.
        </p>
        <div style={line(3)}>
          <a href="mailto:contact@thierrybarbezat.ch" className="cta-primary" style={{ display: "inline-block" }}>Discutons ensemble</a>
        </div>
        <div style={{ ...line(4), marginTop: 44, display: "flex", justifyContent: "center", gap: 32 }}>
          {["LinkedIn", "Email", "GitHub"].map((l) => (
            <a key={l} href="#" className="footer-link">{l}</a>
          ))}
        </div>
        <div style={{ ...line(5), marginTop: 80, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.04)", fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.12)", letterSpacing: "0.05em" }}>
          © 2026 Thierry Barbezat · Genève, Suisse
        </div>
      </div>
    </Slide>
  );
}

// ══════════════════════════════════════════════════════════
// MAIN APP
// ══════════════════════════════════════════════════════════
export default function PortfolioAnimShowcase() {
  const [active, setActive] = useState("hero");
  const containerRef = useRef(null);

  const navigateTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    const obs = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }); },
      { threshold: 0.55 }
    );
    SECTIONS.forEach(({ id }) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={containerRef} style={{
      height: "100vh", overflowY: "auto", scrollSnapType: "y mandatory",
      background: "#0c0c0e", color: "#fff", fontFamily: "'DM Sans', sans-serif",
    }} className="snap-container">
      <DotNav active={active} onNavigate={navigateTo} />
      <HeroSlide />
      <AboutSlide />
      <CompetencesSlide />
      <WebmasterSlide />
      <AutomatisationSlide />
      <SeoSlide />
      <PhotoVideoSlide />
      <EducationSlide />
      <OutilsSlide />
      <ContactSlide />

      <style>{`
        .snap-container { scroll-behavior: smooth; }
        .snap-container::-webkit-scrollbar { display: none; }
        .snap-container { -ms-overflow-style: none; scrollbar-width: none; }

        .overline {
          font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase;
          color: rgba(200,170,120,0.5); font-family: 'DM Sans', sans-serif;
          margin-bottom: 14px; font-weight: 500;
        }
        .accent-italic { color: #c8aa78; font-style: italic; font-weight: 300; }
        .glass-card {
          padding: 28px; background: rgba(255,255,255,0.02);
          border: 1px solid rgba(200,170,120,0.08);
          transition: border-color 0.4s; height: 100%;
        }
        .glass-card:hover { border-color: rgba(200,170,120,0.22); }
        .result-card {
          padding: 28px; background: rgba(255,255,255,0.02);
          border: 1px solid rgba(200,170,120,0.08);
          height: 100%; display: flex; flex-direction: column;
          transition: border-color 0.4s;
        }
        .result-card:hover { border-color: rgba(200,170,120,0.25); }
        .tag {
          padding: 4px 12px; font-size: 10px; font-family: 'DM Sans', sans-serif;
          color: rgba(200,170,120,0.55); border: 1px solid rgba(200,170,120,0.12);
          letter-spacing: 0.05em; font-weight: 400;
        }
        .cta-primary {
          padding: 15px 42px; background: transparent;
          border: 1px solid rgba(200,170,120,0.4);
          color: #c8aa78; text-decoration: none; font-size: 12px;
          letter-spacing: 0.16em; text-transform: uppercase;
          font-family: 'DM Sans', sans-serif; font-weight: 500;
          transition: all 0.4s;
        }
        .cta-primary:hover { background: #c8aa78; color: #0c0c0e; }
        .cta-ghost {
          padding: 15px 42px; background: none; border: none;
          color: rgba(255,255,255,0.35); text-decoration: none; font-size: 12px;
          letter-spacing: 0.16em; text-transform: uppercase;
          font-family: 'DM Sans', sans-serif; font-weight: 400;
          transition: color 0.3s;
        }
        .cta-ghost:hover { color: #fff; }
        .footer-link {
          font-family: 'DM Sans', sans-serif; font-size: 11px;
          color: rgba(255,255,255,0.22); text-decoration: none;
          letter-spacing: 0.1em; text-transform: uppercase;
          transition: color 0.3s; font-weight: 400;
        }
        .footer-link:hover { color: #c8aa78; }
        .scroll-line {
          width: 1px; height: 44px;
          background: linear-gradient(to bottom, rgba(200,170,120,0.4), transparent);
          animation: scrollPulse 2.2s ease-in-out infinite;
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.35; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.15); }
        }
        @media (max-width: 768px) {
          .dot-nav { right: 10px !important; gap: 10px !important; }
        }
      `}</style>
    </div>
  );
}
