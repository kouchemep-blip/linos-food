import { useState, useEffect, useRef } from "react";
import { useInView } from "../../hooks/useInView";
import { TESTIMONIALS } from "../../data/siteData";
import SectionHeader from "../common/SectionHeader";

// Étoiles de notation
function Stars({ count = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className="text-sm"
          style={{ color: i < count ? "#FE9922" : "#D0BBA8" }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

// Avatar initiales
function Avatar({ name }) {
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div
      className="w-12 h-12 rounded-full flex items-center justify-center font-display font-bold text-sm flex-shrink-0"
      style={{
        background: "linear-gradient(135deg, #842F00, #FE9922)",
        color: "white",
      }}
    >
      {initials}
    </div>
  );
}

// Carte témoignage
function TestimonialCard({ item, isActive }) {
  return (
    <div
      className="flex flex-col gap-5 p-7 rounded-3xl h-full transition-all duration-400"
      style={{
        backgroundColor: isActive ? "white" : "#F9F3E8",
        boxShadow: isActive
          ? "0 8px 32px rgba(132,47,0,0.12), 0 24px 48px rgba(132,47,0,0.07)"
          : "none",
        border: isActive ? "none" : "1px solid #E3CDA8",
        transform: isActive ? "scale(1.02)" : "scale(1)",
      }}
    >
      {/* Quote icon */}
      <span
        className="font-display font-black text-5xl leading-none select-none"
        style={{ color: "#FE9922", opacity: 0.4 }}
      >
        "
      </span>

      {/* Texte */}
      <p
        className="font-accent italic text-base leading-relaxed flex-1"
        style={{ color: "#352A20" }}
      >
        {item.text}
      </p>

      {/* Étoiles */}
      <Stars count={item.rating} />

      {/* Auteur */}
      <div
        className="flex items-center gap-3 pt-4"
        style={{ borderTop: "1px solid #F0E3CC" }}
      >
        <Avatar name={item.name} />
        <div>
          <p className="font-semibold text-sm" style={{ color: "#110C08" }}>
            {item.name}
          </p>
          <p className="text-xs" style={{ color: "#8C7560" }}>
            {item.role}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const { ref: sectionRef, inView } = useInView(0.1);
  const timerRef = useRef(null);

  // Auto-rotation toutes les 5 secondes
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timerRef.current);
  }, []);

  const handleDot = (i) => {
    clearInterval(timerRef.current);
    setActive(i);
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
  };

  return (
    <section
      id="testimonials"
      className="section-py"
      style={{ backgroundColor: "#FDFAF5" }}
      ref={sectionRef}
    >
      <div className="container-main">

        {/* En-tête */}
        <div className="mb-14">
          <SectionHeader
            overline="Ils nous font confiance"
            title="Ce que disent"
            highlight="nos clients"
            subtitle="Des centaines de familles et professionnels nous font confiance. Voici quelques-uns de leurs témoignages."
            align="center"
          />
        </div>

        {/* Grille témoignages — desktop: 4 cartes, mobile: slider */}
        {/* Desktop */}
        <div className="hidden lg:grid grid-cols-4 gap-5">
          {TESTIMONIALS.map((item, i) => (
            <div
              key={item.id}
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(28px)",
                transition: "opacity 0.6s ease, transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)",
                transitionDelay: `${i * 100}ms`,
              }}
            >
              <TestimonialCard item={item} isActive={i === active} />
            </div>
          ))}
        </div>

        {/* Mobile — une carte à la fois */}
        <div className="lg:hidden">
          <div
            style={{
              opacity: inView ? 1 : 0,
              transition: "opacity 0.5s ease",
            }}
          >
            <TestimonialCard item={TESTIMONIALS[active]} isActive={true} />
          </div>

          {/* Dots mobile */}
          <div className="flex justify-center gap-2 mt-6">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => handleDot(i)}
                aria-label={`Témoignage ${i + 1}`}
                className="rounded-full transition-all duration-300"
                style={{
                  height: "6px",
                  width: i === active ? "24px" : "6px",
                  backgroundColor: i === active ? "#842F00" : "#D0BBA8",
                }}
              />
            ))}
          </div>
        </div>

        {/* Dots desktop */}
        <div className="hidden lg:flex justify-center gap-2 mt-8">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => handleDot(i)}
              aria-label={`Témoignage ${i + 1}`}
              className="rounded-full transition-all duration-300"
              style={{
                height: "6px",
                width: i === active ? "24px" : "6px",
                backgroundColor: i === active ? "#842F00" : "#D0BBA8",
              }}
            />
          ))}
        </div>

        {/* Bandeau confiance */}
        <TrustBadges inView={inView} />
      </div>
    </section>
  );
}

function TrustBadges({ inView }) {
  const badges = [
    { icon: "🏆", label: "Meilleur restaurant", sub: "Cotonou 2024" },
    { icon: "✅", label: "Certifié hygiène",    sub: "Norme A+" },
    { icon: "🌿", label: "Produits locaux",     sub: "100% frais" },
    { icon: "⚡", label: "Livraison rapide",    sub: "< 30 minutes" },
  ];

  return (
    <div
      className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-5"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s",
      }}
    >
      {badges.map((b, i) => (
        <div
          key={b.label}
          className="flex flex-col items-center gap-2 p-5 rounded-2xl text-center"
          style={{
            backgroundColor: "#F9F3E8",
            border: "1px solid #E3CDA8",
          }}
        >
          <span className="text-3xl">{b.icon}</span>
          <p className="font-semibold text-sm" style={{ color: "#110C08" }}>{b.label}</p>
          <p className="text-xs" style={{ color: "#8C7560" }}>{b.sub}</p>
        </div>
      ))}
    </div>
  );
}