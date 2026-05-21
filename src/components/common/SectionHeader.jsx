import { useInView } from "../../hooks/useInView";

// SectionHeader — Bloc titre standard pour toutes les sections
// Usage :
//   <SectionHeader
//     overline="Nos plats"
//     title="Une cuisine qui"
//     highlight="raconte une histoire"
//     subtitle="Saveurs authentiques, produits locaux."
//     align="center"
//   />

export default function SectionHeader({
  overline,
  title,
  highlight,
  subtitle,
  align = "center",
  dark = false,
}) {
  const { ref, inView } = useInView(0.2);

  const alignClass = align === "center"
    ? "items-center text-center mx-auto"
    : align === "right"
    ? "items-end text-right"
    : "items-start text-left";

  return (
    <div
      ref={ref}
      className={`flex flex-col gap-3 max-w-2xl ${alignClass}`}
    >
      {/* Overline */}
      {overline && (
        <div
          className={`overline justify-${align === "center" ? "center" : align === "right" ? "end" : "start"} in-view-hidden ${inView ? "in-view-visible" : ""}`}
          style={{ transitionDelay: "0ms" }}
        >
          {overline}
        </div>
      )}

      {/* Titre */}
      <h2
        className={`font-display font-bold leading-tight tracking-tight text-3xl sm:text-4xl ${dark ? "text-cream-100" : "text-ink-900"} in-view-hidden ${inView ? "in-view-visible" : ""}`}
        style={{ transitionDelay: "80ms" }}
      >
        {title}{" "}
        {highlight && (
          <em className={`not-italic font-accent italic ${dark ? "text-spice-300" : "text-spice-500"}`}>
            {highlight}
          </em>
        )}
      </h2>

      {/* Décoration */}
      <div
        className={`flex ${align === "center" ? "justify-center" : align === "right" ? "justify-end" : "justify-start"} in-view-hidden ${inView ? "in-view-visible" : ""}`}
        style={{ transitionDelay: "140ms" }}
      >
        <div className="flex items-center gap-1.5">
          <div className={`h-0.5 w-12 rounded-full ${dark ? "bg-soil-500" : "bg-soil-400"}`} />
          <div className={`h-2 w-2 rounded-full ${dark ? "bg-spice-400" : "bg-spice-500"}`} />
          <div className={`h-0.5 w-4 rounded-full ${dark ? "bg-soil-600" : "bg-soil-200"}`} />
        </div>
      </div>

      {/* Sous-titre */}
      {subtitle && (
        <p
          className={`font-accent text-lg leading-relaxed ${dark ? "text-cream-300" : "text-ink-500"} in-view-hidden ${inView ? "in-view-visible" : ""}`}
          style={{ transitionDelay: "200ms" }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}