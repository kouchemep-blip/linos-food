import { useInView } from "../../hooks/useInView";
import { EVENTS, formatPrice } from "../../data/siteData";
import { WHATSAPP_MESSAGES, whatsappLink } from "../../utils/whatsapp";
import SectionHeader from "../common/SectionHeader";

function EventCard({ event, index }) {
  const { ref, inView } = useInView(0.15);

  const badgeStyle = {
    "À venir":       { bg: "#FFF4E0", color: "#842F00" },
    "Régulier":      { bg: "#E1F0D8", color: "#325826" },
    "Places limitées": { bg: "#FFE4E4", color: "#8B1A1A" },
  }[event.badge] || { bg: "#F0E3CC", color: "#4E3E30" };

  return (
    <article
      ref={ref}
      className="card group flex flex-col sm:flex-row overflow-hidden"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: "opacity 0.6s ease, transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)",
        transitionDelay: `${index * 110}ms`,
      }}
    >
      {/* Bande colorée latérale */}
      <div
        className="w-full sm:w-2 flex-shrink-0 transition-all duration-400"
        style={{
          height: "6px",
          minHeight: "6px",
          background: "linear-gradient(to right, #842F00, #FE9922)",
        }}
      />

      <div className="flex flex-col sm:flex-row flex-1 p-6 gap-5">
        {/* Bloc date */}
        <div
          className="flex-shrink-0 flex flex-row sm:flex-col items-center sm:items-center justify-start sm:justify-center gap-3 sm:gap-1 sm:w-24 sm:text-center"
          style={{
            padding: "0.75rem 1rem",
            backgroundColor: "rgba(132,47,0,0.05)",
            borderRadius: "12px",
          }}
        >
          <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "#842F00" }}>
            {event.type.split(" ")[0]}
          </span>
          <span className="font-display font-bold text-sm sm:text-lg leading-tight" style={{ color: "#110C08" }}>
            {event.date}
          </span>
          <span className="text-xs" style={{ color: "#8C7560" }}>{event.time}</span>
        </div>

        {/* Contenu */}
        <div className="flex flex-col gap-3 flex-1">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <h3 className="font-display font-semibold text-xl leading-snug" style={{ color: "#110C08" }}>
              {event.title}
            </h3>
            <span
              className="text-xs font-bold px-3 py-1 rounded-full flex-shrink-0"
              style={{ backgroundColor: badgeStyle.bg, color: badgeStyle.color }}
            >
              {event.badge}
            </span>
          </div>

          <p className="font-accent italic text-sm leading-relaxed" style={{ color: "#6B5645" }}>
            {event.description}
          </p>

          <div className="flex items-center justify-between flex-wrap gap-3 mt-auto pt-3" style={{ borderTop: "1px solid #F0E3CC" }}>
            <div className="flex items-center gap-4">
              <span className="text-xs" style={{ color: "#8C7560" }}>
                👥 {event.capacity} personnes max
              </span>
              <span className="font-display font-bold text-lg" style={{ color: "#842F00" }}>
                {formatPrice(event.price)}
              </span>
            </div>
            <a
              href="#contact"
              className="btn btn-sm btn-primary"
            >
              Je m'inscris
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Events() {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="evenements" className="section-py section-warm">
      <div className="container-main">

        <div className="mb-12">
          <SectionHeader
            overline="Agenda & Événements"
            title="Vivez des expériences"
            highlight="uniques"
            subtitle="Soirées thématiques, ateliers cuisine, brunchs dominicaux — rejoignez-nous pour des moments inoubliables."
            align="center"
          />
        </div>

        <div className="flex flex-col gap-5" ref={ref}>
          {EVENTS.map((event, i) => (
            <EventCard key={event.id} event={event} index={i} />
          ))}
        </div>

        {/* CTA Catering */}
        <div
          className="mt-12 rounded-3xl p-8 sm:p-10 text-center"
          style={{
            backgroundColor: "#110C08",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease 0.4s, transform 0.7s ease 0.4s",
          }}
        >
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#FE9922" }}>
            Service traiteur
          </p>
          <h3 className="font-display font-bold text-2xl sm:text-3xl text-white mb-3">
            Votre événement, notre passion
          </h3>
          <p className="font-accent italic mb-7 max-w-lg mx-auto" style={{ color: "rgba(249,243,232,0.65)" }}>
            Mariages, séminaires, anniversaires… Nous créons des menus sur mesure adaptés à vos envies et votre budget.
          </p>
          <a
            href={whatsappLink(WHATSAPP_MESSAGES.cateringQuote)}
            target="_blank"
            rel="noreferrer"
            className="btn btn-gold btn-lg"
          >
            Demander un devis gratuit
          </a>
        </div>

      </div>
    </section>
  );
}
