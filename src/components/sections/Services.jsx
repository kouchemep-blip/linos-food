import { useInView } from "../../hooks/useInView";
import { SERVICES } from "../../data/siteData";
import { WHATSAPP_MESSAGES, whatsappLink } from "../../utils/whatsapp";
import SectionHeader from "../common/SectionHeader";

const SERVICE_MESSAGES = {
  s1: WHATSAPP_MESSAGES.reservation,
  s2: WHATSAPP_MESSAGES.order,
  s3: WHATSAPP_MESSAGES.quote,
  s4: WHATSAPP_MESSAGES.menu,
};

// Card individuelle d'un service
function ServiceCard({ service, index }) {
  const { ref, inView } = useInView(0.15);

  return (
    <div
      ref={ref}
      className="card-warm flex flex-col gap-5 p-7 group cursor-default"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: "opacity 0.6s ease, transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94), background 0.3s ease, box-shadow 0.3s ease",
        transitionDelay: `${index * 90}ms`,
      }}
    >
      {/* Icône */}
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: "rgba(132,47,0,0.08)" }}
      >
        {service.icon}
      </div>

      {/* Titre */}
      <div>
        <h3
          className="font-display font-semibold text-xl mb-2 leading-snug"
          style={{ color: "#110C08" }}
        >
          {service.title}
        </h3>
        <p className="text-sm leading-relaxed font-accent italic" style={{ color: "#6B5645" }}>
          {service.description}
        </p>
      </div>

      {/* Features list */}
      <ul className="flex flex-col gap-2 flex-1">
        {service.features.map((feat) => (
          <li key={feat} className="flex items-center gap-2.5 text-sm" style={{ color: "#4E3E30" }}>
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: "#FE9922" }}
            />
            {feat}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href={whatsappLink(SERVICE_MESSAGES[service.id] || service.cta)}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-250 group/link mt-auto pt-2"
        style={{
          color: "#842F00",
          borderTop: "1px solid rgba(132,47,0,0.1)",
        }}
        onMouseEnter={(e) => e.currentTarget.style.gap = "12px"}
        onMouseLeave={(e) => e.currentTarget.style.gap = "8px"}
      >
        {service.cta}
        <span className="transition-transform duration-250 group-hover/link:translate-x-1">→</span>
      </a>
    </div>
  );
}

export default function Services() {
  const { ref: titleRef, inView: titleInView } = useInView(0.2);

  return (
    <section id="services" className="section-py" style={{ backgroundColor: "#FDFAF5" }}>
      <div className="container-main">

        {/* En-tête */}
        <div ref={titleRef} className="mb-14">
          <SectionHeader
            overline="Ce que nous offrons"
            title="Des services pensés"
            highlight="pour vous"
            subtitle="De la table à votre porte, en passant par vos événements les plus précieux — nous sommes là à chaque étape."
            align="center"
          />
        </div>

        {/* Grille 4 cartes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

        {/* Bandeau CTA bas */}
        <CtaBanner />
      </div>
    </section>
  );
}

function CtaBanner() {
  const { ref, inView } = useInView(0.2);

  return (
    <div
      ref={ref}
      className="mt-14 rounded-3xl p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6"
      style={{
        background: "linear-gradient(135deg, #842F00 0%, #A03800 60%, #FE9922 100%)",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.7s ease, transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)",
      }}
    >
      <div>
        <p className="font-display font-bold text-2xl sm:text-3xl text-white leading-snug mb-2">
          Un événement à organiser ?
        </p>
        <p className="font-accent italic text-white/75 text-base">
          Contactez-nous pour un devis gratuit et personnalisé.
        </p>
      </div>
      <a
        href={whatsappLink(WHATSAPP_MESSAGES.eventContact)}
        target="_blank"
        rel="noreferrer"
        className="flex-shrink-0 btn btn-lg"
        style={{
          backgroundColor: "white",
          color: "#842F00",
          fontWeight: "700",
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        }}
      >
        Nous contacter
      </a>
    </div>
  );
}
