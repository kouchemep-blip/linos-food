import { useState, useEffect } from "react";
import { useScrolled } from "../../hooks/useScrolled";
import { NAV_LINKS, SITE_CONFIG } from "../../data/siteData";
import { WHATSAPP_MESSAGES, whatsappLink } from "../../utils/whatsapp";

export default function Navbar({ cartCount = 0, logoSettled = false, onCartOpen }) {
  const scrolled = useScrolled(60);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        className={[
          "fixed top-0 left-0 right-0 z-50",
          "transition-all duration-400",
          scrolled
            ? "py-3"
            : "py-5 bg-transparent",
        ].join(" ")}
        style={scrolled ? {
          backgroundColor: "rgba(253,250,245,0.96)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          boxShadow: "0 4px 20px rgba(132,47,0,0.10)",
        } : {}}
      >
        <div className="container-main flex items-center justify-between">

          {/* ── LOGO ─────────────────────────────────────── */}
          <a href="#hero" className="navbar-logo-link flex w-16 items-center" aria-label="Accueil Lino's Food">
            <img
              src="/linos-logo.png"
              alt="Lino's Food"
              className={`navbar-logo h-14 w-14 object-contain transition-opacity duration-300 sm:h-16 sm:w-16 ${
                logoSettled ? "navbar-logo--settled opacity-100" : "opacity-0"
              }`}
            />
          </a>

          {/* ── NAV DESKTOP ──────────────────────────────── */}
          <nav className="hidden md:flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-sm">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`nav-link-premium ${scrolled ? "nav-link-light" : "nav-link-dark"} relative overflow-hidden rounded-full px-4 py-2 text-sm font-semibold tracking-wide transition-all duration-300`}
                style={{ color: scrolled ? "#4E3E30" : "rgba(249,243,232,0.85)" }}
              >
                <span className="relative z-10">{link.label}</span>
              </a>
            ))}
          </nav>

          {/* ── CTA + BURGER ─────────────────────────────── */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onCartOpen}
              className="relative hidden h-10 min-w-10 items-center justify-center rounded-full border px-3 text-sm font-black transition-all duration-300 md:inline-flex"
              style={scrolled ? {
                borderColor: "rgba(132,47,0,0.18)",
                color: "#842F00",
                backgroundColor: "rgba(255,244,224,0.72)",
              } : {
                borderColor: "rgba(249,243,232,0.45)",
                color: "#F9F3E8",
                backgroundColor: "rgba(255,255,255,0.08)",
              }}
              aria-label={`Ouvrir le panier, ${cartCount} article${cartCount > 1 ? "s" : ""}`}
            >
              <span aria-hidden="true">Panier</span>
              <span className="ml-2 grid h-5 min-w-5 place-items-center rounded-full bg-[#FE9922] px-1 text-[0.68rem] text-[#110C08]">
                {cartCount}
              </span>
            </button>

            {cartCount > 0 && (
              <button
                type="button"
                onClick={onCartOpen}
                className="relative inline-flex h-10 min-w-10 items-center justify-center rounded-full border border-[#FE9922]/70 bg-[#FE9922] px-3 text-sm font-black text-[#110C08] shadow-[0_8px_22px_rgba(254,153,34,0.26)] md:hidden"
                aria-label={`Ouvrir le panier, ${cartCount} article${cartCount > 1 ? "s" : ""}`}
              >
                <span aria-hidden="true" className="text-base leading-none">🛒</span>
                <span className="ml-2 grid h-5 min-w-5 place-items-center rounded-full bg-[#110C08] px-1 text-[0.68rem] text-white">
                  {cartCount}
                </span>
              </button>
            )}

            <a
              href={whatsappLink(WHATSAPP_MESSAGES.navbarReservation)}
              target="_blank"
              rel="noreferrer"
              className="hidden md:inline-flex btn btn-sm"
              style={scrolled ? {
                backgroundImage: "linear-gradient(135deg, #842F00, #A03800, #FE9922)",
                color: "white",
                boxShadow: "0 4px 16px rgba(132,47,0,0.22)",
              } : {
                background: "transparent",
                color: "#F9F3E8",
                border: "1.5px solid rgba(249,243,232,0.5)",
              }}
            >
              Réserver
            </a>

            {/* Bouton hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Fermer" : "Menu"}
              aria-expanded={menuOpen}
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-full transition-all duration-250"
              style={{ color: scrolled ? "#110C08" : "#F9F3E8" }}
            >
              <span className={`block w-5 h-0.5 rounded-full bg-current transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-[3px]" : ""}`} />
              <span className={`block w-5 h-0.5 rounded-full bg-current my-1 transition-all duration-200 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
              <span className={`block w-5 h-0.5 rounded-full bg-current transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
            </button>
          </div>
        </div>
      </header>

      {/* ── OVERLAY ──────────────────────────────────────── */}
      <div
        onClick={() => setMenuOpen(false)}
        className="fixed inset-0 z-40 md:hidden transition-opacity duration-300"
        style={{
          backgroundColor: "rgba(17,12,8,0.6)",
          backdropFilter: "blur(4px)",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
        }}
        aria-hidden="true"
      />

      {/* ── PANNEAU MOBILE ───────────────────────────────── */}
      <nav
        className="fixed top-0 right-0 bottom-0 z-40 w-72 flex flex-col pt-20 pb-8 px-6 md:hidden transition-transform duration-400 overflow-hidden"
        style={{
          backgroundColor: "#FDFAF5",
          backgroundImage: "linear-gradient(rgba(253,250,245,0.84), rgba(253,250,245,0.92)), url('/linos-logo.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center 5.5rem",
          backgroundSize: "15rem auto",
          boxShadow: "-8px 0 48px rgba(132,47,0,0.12)",
          transform: menuOpen ? "translateX(0)" : "translateX(100%)",
          transitionTimingFunction: "cubic-bezier(0.25,0.46,0.45,0.94)",
        }}
      >
        <ul className="flex flex-col gap-1 flex-1">
          {NAV_LINKS.map((link, i) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center px-4 py-3 rounded-xl font-medium text-base transition-all duration-200 in-view-hidden"
                style={{
                  color: "#352A20",
                  transitionDelay: menuOpen ? `${i * 45}ms` : "0ms",
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? "translateY(0)" : "translateY(10px)",
                  transitionProperty: "opacity, transform, background-color, color",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(132,47,0,0.07)";
                  e.currentTarget.style.color = "#842F00";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#352A20";
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div style={{ borderTop: "1px solid #E3CDA8", paddingTop: "1.5rem" }} className="flex flex-col gap-4">
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              onCartOpen?.();
            }}
            className="flex h-12 w-full items-center justify-center rounded-full border border-[#D0BBA8] bg-white text-sm font-black uppercase tracking-[0.08em] text-[#842F00]"
          >
            Panier ({cartCount})
          </button>
          <p className="text-xs font-medium tracking-wide" style={{ color: "#B09880" }}>
            {SITE_CONFIG.phone}
          </p>
          <a
            href={whatsappLink(WHATSAPP_MESSAGES.navbarReservation)}
            target="_blank"
            rel="noreferrer"
            onClick={() => setMenuOpen(false)}
            className="btn btn-primary w-full justify-center"
          >
            Réserver une table
          </a>
        </div>
      </nav>
    </>
  );
}
