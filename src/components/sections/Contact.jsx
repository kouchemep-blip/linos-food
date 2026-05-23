import { useState } from "react";
import { useInView } from "../../hooks/useInView";
import { SITE_CONFIG } from "../../data/siteData";
import SectionHeader from "../common/SectionHeader";
import { whatsappLink } from "../../utils/whatsapp";

const RESTAURANT_COORDS = "6.369353,2.478005";
const LOCATION_MAP_SRC =
  "https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d495.6488463363982!2d2.478005!3d6.369353!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNsKwMjInMDkuNyJOIDLCsDI4JzQxLjYiRQ!5e0!3m2!1sfr!2sbj!4v1779403664263!5m2!1sfr!2sbj";
const fallbackRouteSrc = `https://maps.google.com/maps?daddr=${RESTAURANT_COORDS}&output=embed`;

// Champ de formulaire réutilisable
function Field({ label, id, type = "text", required, placeholder, rows }) {
  const base = {
    width: "100%",
    padding: "0.75rem 1rem",
    borderRadius: "12px",
    border: "1.5px solid #E3CDA8",
    backgroundColor: "#FDFAF5",
    fontFamily: "inherit",
    fontSize: "0.9rem",
    color: "#110C08",
    outline: "none",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
  };

  const props = {
    id,
    name: id,
    required,
    placeholder,
    style: base,
    onFocus: (e) => {
      e.target.style.borderColor = "#842F00";
      e.target.style.boxShadow = "0 0 0 3px rgba(132,47,0,0.1)";
    },
    onBlur: (e) => {
      e.target.style.borderColor = "#E3CDA8";
      e.target.style.boxShadow = "none";
    },
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-sm font-medium"
        style={{ color: "#4E3E30" }}
      >
        {label}
        {required && <span style={{ color: "#842F00" }}> *</span>}
      </label>
      {rows ? (
        <textarea
          {...props}
          rows={rows}
          style={{ ...base, resize: "vertical", minHeight: "120px" }}
        />
      ) : (
        <input {...props} type={type} />
      )}
    </div>
  );
}

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mapSrc, setMapSrc] = useState(LOCATION_MAP_SRC);
  const [routeStatus, setRouteStatus] = useState("");
  const { ref: leftRef, inView: leftIn } = useInView(0.15);
  const { ref: rightRef, inView: rightIn } = useInView(0.15);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const nom = form.get("nom") || "";
    const tel = form.get("tel") || "";
    const sujet = form.get("sujet") || "Demande depuis le site";
    const message = form.get("message") || "";

    const text = `Bonjour Cheffe, je m'appelle ${nom} (${tel}). Sujet : ${sujet}. ${message}`;
    window.open(whatsappLink(text), "_blank");

    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 400);
  };

  const handleShowRoute = () => {
    setRouteStatus("Calcul de votre itineraire...");

    if (!navigator.geolocation) {
      setMapSrc(fallbackRouteSrc);
      setRouteStatus("Itineraire affiche vers Lino's Food.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const origin = `${coords.latitude},${coords.longitude}`;
        setMapSrc(
          `https://maps.google.com/maps?saddr=${encodeURIComponent(origin)}&daddr=${encodeURIComponent(RESTAURANT_COORDS)}&output=embed`,
        );
        setRouteStatus("Itineraire affiche depuis votre position actuelle.");
      },
      () => {
        setMapSrc(fallbackRouteSrc);
        setRouteStatus("Position non autorisee. La carte affiche la destination du restaurant.");
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 },
    );
  };

  const infos = [
    { icon: "📍", label: "Adresse", value: SITE_CONFIG.address },
    {
      icon: "📞",
      label: "Téléphone",
      value: SITE_CONFIG.phone,
      href: `tel:${SITE_CONFIG.phone}`,
    },
    {
      icon: "✉️",
      label: "Email",
      value: SITE_CONFIG.email,
      href: `mailto:${SITE_CONFIG.email}`,
    },
    {
      icon: "🕐",
      label: "Horaires",
      value: `Lun–Ven ${SITE_CONFIG.hours.weekdays}`,
    },
  ];

  return (
    <section
      id="contact"
      className="section-py"
      style={{ backgroundColor: "#FDFAF5" }}
    >
      <div className="container-main">
        <div className="mb-12">
          <SectionHeader
            overline="Contactez-nous"
            title="Parlons de votre"
            highlight="projet"
            subtitle="Une réservation, un devis, une question — nous vous répondons sous 24h."
            align="center"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Colonne infos */}
          <div
            ref={leftRef}
            className="lg:col-span-2 flex flex-col gap-6"
            style={{
              opacity: leftIn ? 1 : 0,
              transform: leftIn ? "translateX(0)" : "translateX(-24px)",
              transition:
                "opacity 0.6s ease, transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)",
            }}
          >
            {infos.map(({ icon, label, value, href }) => (
              <div key={label} className="flex items-start gap-4">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ backgroundColor: "rgba(132,47,0,0.08)" }}
                >
                  {icon}
                </div>
                <div>
                  <p
                    className="text-xs font-semibold tracking-wider uppercase mb-0.5"
                    style={{ color: "#842F00" }}
                  >
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      className="text-sm font-medium hover:underline"
                      style={{ color: "#110C08" }}
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm" style={{ color: "#4E3E30" }}>
                      {value}
                    </p>
                  )}
                </div>
              </div>
            ))}

            {/* Bloc horaires complet */}
            <div
              className="rounded-2xl p-5 mt-2"
              style={{
                backgroundColor: "#F9F3E8",
                border: "1px solid #E3CDA8",
              }}
            >
              <p
                className="text-xs font-semibold tracking-wider uppercase mb-3"
                style={{ color: "#842F00" }}
              >
                Horaires d'ouverture
              </p>
              {[
                { j: "Lundi – Vendredi", h: SITE_CONFIG.hours.weekdays },
                { j: "Samedi – Dimanche", h: SITE_CONFIG.hours.weekends },
                { j: "Dimanche", h: "Fermé", closed: true },
              ].map(({ j, h, closed }) => (
                <div
                  key={j}
                  className="flex justify-between items-center py-1.5"
                  style={{ borderBottom: "1px solid rgba(132,47,0,0.08)" }}
                >
                  <span className="text-sm" style={{ color: "#4E3E30" }}>
                    {j}
                  </span>
                  <span
                    className="text-sm font-medium"
                    style={{ color: closed ? "#B09880" : "#842F00" }}
                  >
                    {h}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Formulaire */}
          <div
            ref={rightRef}
            className="lg:col-span-3"
            style={{
              opacity: rightIn ? 1 : 0,
              transform: rightIn ? "translateX(0)" : "translateX(24px)",
              transition:
                "opacity 0.6s ease 0.1s, transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94) 0.1s",
            }}
          >
            <div className="card p-7 sm:p-9">
              {sent ? (
                <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
                  <span className="text-5xl">✅</span>
                  <h3
                    className="font-display font-bold text-2xl"
                    style={{ color: "#110C08" }}
                  >
                    Message envoyé !
                  </h3>
                  <p
                    className="font-accent italic"
                    style={{ color: "#6B5645" }}
                  >
                    Nous vous répondrons dans les 24 heures. Merci !
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="btn btn-secondary mt-2"
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field
                      id="nom"
                      label="Nom complet"
                      required
                      placeholder="Marie Dupont"
                    />
                    <Field
                      id="tel"
                      label="Téléphone"
                      type="tel"
                      placeholder="+229 xx xx xx xx"
                    />
                  </div>
                  <Field
                    id="email"
                    label="Email"
                    type="email"
                    required
                    placeholder="vous@example.com"
                  />
                  <Field
                    id="sujet"
                    label="Sujet"
                    placeholder="Réservation, devis, information…"
                  />
                  <Field
                    id="message"
                    label="Votre message"
                    required
                    placeholder="Décrivez votre demande…"
                    rows={5}
                  />

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary btn-lg w-full justify-center mt-1"
                    style={
                      loading ? { opacity: 0.7, cursor: "not-allowed" } : {}
                    }
                  >
                    {loading ? (
                      <>
                        <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                        Envoi en cours…
                      </>
                    ) : (
                      "Envoyer le message"
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-[0.85fr_1.5fr] lg:items-stretch">
          <div className="rounded-3xl bg-[#110C08] p-7 text-[#F9F3E8] shadow-[0_18px_42px_rgba(82,43,19,0.12)]">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#FE9922]">
              Nous trouver
            </p>
            <h3 className="mt-3 font-display text-4xl font-bold leading-none">
              Degakon, Cotonou
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-[#F0E3CC]/80">
              En face de l'ecole Stella Matutina. Ouvrez la carte pour lancer
              votre itineraire et venir directement au restaurant.
            </p>
            <button
              type="button"
              onClick={handleShowRoute}
              className="mt-6 inline-flex rounded-full bg-[#FE9922] px-5 py-3 text-sm font-black uppercase tracking-[0.08em] text-[#110C08] transition hover:bg-[#FFB55A]"
            >
              Ouvrir l'itineraire
            </button>
            {routeStatus && (
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#FE9922]/85">
                {routeStatus}
              </p>
            )}
          </div>

          <div className="relative min-h-[24rem] overflow-hidden rounded-3xl border border-[#E3CDA8] shadow-[0_18px_42px_rgba(82,43,19,0.12)]">
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-20 bg-gradient-to-b from-[#110C08]/20 to-transparent" />
            <iframe
              title="Localisation Lino's Food"
              src={mapSrc}
              width="600"
              height="450"
              className="h-full min-h-[24rem] w-full grayscale-[12%] saturate-[1.08]"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
