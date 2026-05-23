import { useState, useEffect, useRef, useCallback } from "react";
import { useCountUp } from "../../hooks/useCountUp";
import { WHATSAPP_MESSAGES, whatsappLink } from "../../utils/whatsapp";

// ── SLIDES ────────────────────────────────────────────────────
// bg : classes Tailwind pour le fond de secours (visible avant la vraie photo)
// image : mettre ici le chemin vers ta photo quand tu l'as
// overlay : opacité de l'assombrissement sur la photo
const SLIDES = [
  {
    id: 0,
    label: "Spécialités locales",
    title: "Des saveurs qui",
    highlight: "racontent une histoire",
    subtitle:
      "Cuisine authentique, produits locaux, chaleur humaine. Chaque plat est préparé avec soin et passion.",
    image: "/hero-slide-1.jpg",
    bgFallback: "from-brand-bg via-ink-900 to-ink-800",
    accentColor: "#FE9922",
    stats: [
      { value: "8", suffix: "+", label: "Années d'expérience" },
      { value: "150", suffix: "+", label: "Événements réalisés" },
      { value: "30", suffix: "+", label: "Plats maîtrisés" },
      { value: "5", suffix: "★", label: "Note moyenne" },
    ],
  },
  {
    id: 1,
    label: "Catering & Événements",
    title: "Vos moments",
    highlight: "mémorables",
    subtitle:
      "Mariages, séminaires, anniversaires — nous prenons soin de chaque détail pour vous.",
    image: "/hero-slide-2.jpg",
    bgFallback: "from-ink-900 via-brand-dark to-brand-bg",
    accentColor: "#FE9922",
    stats: [
      { value: "150", suffix: "+", label: "Événements organisés" },
      { value: "15", suffix: "+", label: "Places assises" },
      { value: "100", suffix: "%", label: "Fait maison" },
      { value: "100", suffix: "%", label: "Clients satisfaits" },
    ],
  },
  {
    id: 2,
    label: "Livraison à domicile",
    title: "Le goût du",
    highlight: "fait maison",
    subtitle:
      "Vos plats préférés livrés chauds, directement à votre porte en moins de 30 minutes.",
    image: "/hero-slide-3.jpg",
    bgFallback: "from-ink-900 via-ink-800 to-brand-bg",
    accentColor: "#FE9922",
    stats: [
      { value: "30", suffix: " min", label: "Délai de livraison" },
      { value: "50", suffix: " km", label: "Zone de couverture" },
      { value: "50", suffix: "+", label: "Plats disponibles" },
      { value: "6", suffix: "j/7", label: "Disponible" },
    ],
  },
];

// ── COMPOSANT STAT INDIVIDUEL AVEC COUNTER ────────────────────
function StatItem({ value, suffix, label, accentColor, triggerCount }) {
  const numeric = parseFloat(String(value).replace(/[^0-9.]/g, ""));
  const isDecimal = String(value).includes(".");
  const count = useCountUp(numeric, 1600, triggerCount);

  const display = isDecimal ? count.toFixed(1) : Math.floor(count).toString();

  return (
    <div className="flex flex-col gap-1">
      <span
        className="font-number font-bold text-3xl sm:text-4xl leading-none"
        style={{ color: accentColor }}
      >
        {display}
        {suffix}
      </span>
      <span className="text-cream-200/65 text-xs sm:text-sm leading-snug font-body">
        {label}
      </span>
    </div>
  );
}

// ── HERO PRINCIPAL ────────────────────────────────────────────
export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [contentVisible, setContentVisible] = useState(true);
  const [triggerCount, setTriggerCount] = useState(false);
  const timerRef = useRef(null);

  // Démarrer les counters après que le contenu soit visible
  useEffect(() => {
    if (contentVisible) {
      const t = setTimeout(() => setTriggerCount(true), 300);
      return () => clearTimeout(t);
    } else {
      setTriggerCount(false);
    }
  }, [contentVisible]);

  // Changement de slide : fade out → change → fade in
  const goToSlide = useCallback(
    (nextIndex) => {
      if (animating) return;
      setAnimating(true);
      setContentVisible(false);

      setTimeout(() => {
        setCurrent(nextIndex);
        setContentVisible(true);
        setAnimating(false);
      }, 400);
    },
    [animating],
  );

  // Auto-avance toutes les 6 secondes
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent((prev) => {
        const next = (prev + 1) % SLIDES.length;
        // Déclencher la transition sans passer par goToSlide (évite le bug)
        setAnimating(true);
        setContentVisible(false);
        setTimeout(() => {
          setCurrent(next);
          setContentVisible(true);
          setAnimating(false);
        }, 400);
        return prev; // on retourne prev ici, setCurrent(next) est dans le timeout
      });
    }, 6000);
    return () => clearInterval(timerRef.current);
  }, []);

  // Reset timer quand on clique manuellement
  const handleDotClick = (i) => {
    if (i === current || animating) return;
    clearInterval(timerRef.current);
    goToSlide(i);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => {
        const next = (prev + 1) % SLIDES.length;
        setAnimating(true);
        setContentVisible(false);
        setTimeout(() => {
          setCurrent(next);
          setContentVisible(true);
          setAnimating(false);
        }, 400);
        return prev;
      });
    }, 6000);
  };

  const slide = SLIDES[current];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-end overflow-hidden"
      aria-label="Section d'accueil"
    >
      {/* ── FOND : image réelle OU dégradé de secours ──── */}
      {slide.image ? (
        <picture>
          <source
            srcSet={`${slide.image}?w=768&q=75`}
            media="(max-width: 768px)"
            type="image/webp"
          />
          <img
            src={slide.image}
            alt=""
            aria-hidden="true"
            loading="eager"
            fetchpriority="high"
            className="absolute inset-0 w-full h-full object-cover object-center"
            style={{
              transition: "opacity 0.5s ease",
              opacity: contentVisible ? 1 : 0.7,
            }}
          />
        </picture>
      ) : (
        // Fond dégradé de secours (retiré une fois que tu as les photos)
        <div
          className={`absolute inset-0 bg-gradient-to-br ${slide.bgFallback} transition-opacity duration-500`}
        />
      )}

      {/* ── OVERLAY SOMBRE (reste actif sur les vraies photos) ── */}
      {/* C'est cet overlay qui donnera l'effet sombre sur tes images */}
      <div
        className="absolute inset-0 bg-gradient-hero pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {/* Overlay additionnel latéral gauche pour lisibilité du texte */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgba(17,12,8,0.5) 0%, rgba(17,12,8,0.1) 60%, transparent 100%)",
          zIndex: 1,
        }}
      />

      {/* ── GRAIN TEXTURE ───────────────────────────────── */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          zIndex: 2,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ── LUEUR ACCENT (décorative) ───────────────────── */}
      <div
        className="absolute bottom-0 left-0 w-[600px] h-[400px] pointer-events-none"
        style={{
          zIndex: 1,
          background: `radial-gradient(ellipse at bottom left, ${slide.accentColor}18 0%, transparent 70%)`,
          transition: "background 0.6s ease",
        }}
      />

      {/* ── DOTS NAVIGATION (desktop) ───────────────────── */}
      <div
        className="absolute right-8 bottom-1/3 hidden lg:flex flex-col gap-2.5"
        style={{ zIndex: 3 }}
      >
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => handleDotClick(i)}
            aria-label={`Aller au slide ${i + 1}`}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === current ? "6px" : "6px",
              height: i === current ? "24px" : "6px",
              backgroundColor:
                i === current ? slide.accentColor : "rgba(249,243,232,0.35)",
            }}
          />
        ))}
      </div>

      {/* ── CONTENU PRINCIPAL ───────────────────────────── */}
      <div
        className="container-main relative w-full pb-16 lg:pb-24 pt-32"
        style={{ zIndex: 3 }}
      >
        <div className="max-w-3xl">
          {/* Overline */}
          <div
            className="flex items-center gap-3 mb-5 transition-all duration-500"
            style={{
              opacity: contentVisible ? 1 : 0,
              transform: contentVisible ? "translateY(0)" : "translateY(12px)",
              transitionDelay: "0ms",
            }}
          >
            <span
              className="block h-px w-8 rounded-full"
              style={{ backgroundColor: slide.accentColor }}
            />
            <span className="text-xs font-semibold tracking-widest uppercase text-cream-200/80">
              {slide.label}
            </span>
          </div>

          {/* Titre */}
          <h1
            className="font-display font-bold text-cream-50 leading-tight mb-5 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl transition-all duration-500"
            style={{
              opacity: contentVisible ? 1 : 0,
              transform: contentVisible ? "translateY(0)" : "translateY(18px)",
              transitionDelay: "70ms",
            }}
          >
            {slide.title}{" "}
            <em
              className="not-italic font-accent italic"
              style={{ color: slide.accentColor }}
            >
              {slide.highlight}
            </em>
          </h1>

          {/* Sous-titre */}
          <p
            className="font-accent text-lg sm:text-xl text-cream-100/75 leading-relaxed mb-10 max-w-xl transition-all duration-500"
            style={{
              opacity: contentVisible ? 1 : 0,
              transform: contentVisible ? "translateY(0)" : "translateY(14px)",
              transitionDelay: "140ms",
            }}
          >
            {slide.subtitle}
          </p>

          {/* Boutons CTA */}
          <div
            className="flex flex-wrap gap-4 transition-all duration-500"
            style={{
              opacity: contentVisible ? 1 : 0,
              transform: contentVisible ? "translateY(0)" : "translateY(14px)",
              transitionDelay: "210ms",
            }}
          >
            <a href="#menu" className="btn btn-gold btn-lg">
              Découvrir la carte
            </a>
            <a
              href={whatsappLink(WHATSAPP_MESSAGES.reservation)}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline-light btn-lg"
            >
              Réserver une table
            </a>
          </div>
        </div>

        {/* ── STATS AVEC COUNTER ──────────────────────── */}
        <div
          className="mt-14 pt-8 border-t border-cream-100/10 grid grid-cols-2 sm:grid-cols-4 gap-6 transition-all duration-600"
          style={{
            opacity: contentVisible ? 1 : 0,
            transform: contentVisible ? "translateY(0)" : "translateY(14px)",
            transitionDelay: "280ms",
          }}
        >
          {slide.stats.map((stat) => (
            <StatItem
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              accentColor={slide.accentColor}
              triggerCount={triggerCount}
            />
          ))}
        </div>
      </div>

      {/* ── DOTS MOBILE ─────────────────────────────────── */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 lg:hidden"
        style={{ zIndex: 3 }}
      >
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => handleDotClick(i)}
            aria-label={`Slide ${i + 1}`}
            className="rounded-full transition-all duration-300"
            style={{
              height: "6px",
              width: i === current ? "24px" : "6px",
              backgroundColor:
                i === current ? slide.accentColor : "rgba(249,243,232,0.35)",
            }}
          />
        ))}
      </div>
    </section>
  );
}
