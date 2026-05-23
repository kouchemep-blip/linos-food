import { NAV_LINKS, SITE_CONFIG } from "../../data/siteData";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="about" className="relative overflow-hidden bg-[#F27A1A] text-[#160B05]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,231,184,0.32),transparent_28%),radial-gradient(circle_at_80%_80%,rgba(132,47,0,0.18),transparent_32%)]" />

      <div className="relative mx-auto flex min-h-[92vh] max-w-[96rem] flex-col px-5 py-7 sm:px-8 lg:px-12">
        <div className="flex items-start justify-between gap-5">
          <p className="max-w-[13rem] text-xs font-black uppercase leading-relaxed tracking-[0.2em]">
            Lino's Food<br />
            Cuisine chaude<br />
            moments vrais
          </p>
          <a
            href="#hero"
            className="rounded-full border-2 border-[#160B05] px-5 py-2 text-sm font-black uppercase tracking-[0.12em] transition hover:bg-[#160B05] hover:text-[#F27A1A]"
          >
            Haut de page
          </a>
        </div>

        <div className="flex flex-1 flex-col justify-between py-8">
          <br /> <br />
          <p className="font-genty select-none text-[clamp(6rem,22vw,22rem)] font-bold leading-[0.72] tracking-[-0.04em]">
            Lino's
          </p>

          <div className="grid gap-8 py-8 md:grid-cols-[1.1fr_0.8fr_1fr] md:items-end">
            <div>
              <p className="font-display text-4xl font-bold leading-none sm:text-5xl">
                Restaurant, livraison<br />
                et moments a table.
              </p>
            </div>

            <nav className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm font-black uppercase tracking-[0.12em]">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="w-fit border-b-2 border-transparent transition hover:border-[#160B05]"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="text-sm font-semibold leading-relaxed md:text-right">
              <p>{SITE_CONFIG.phone}</p>
              <p>{SITE_CONFIG.email}</p>
              <p>{SITE_CONFIG.address}</p>
              <p className="mt-3 text-xs font-black uppercase tracking-[0.16em]">
                {SITE_CONFIG.hours.closed}
              </p>
            </div>
          </div>
          <br /> <br /> <br />
          <h6 className="font-genty select-none text-right text-[clamp(7rem,25vw,24rem)] font-bold leading-[0.72] tracking-[-0.04em]">
            Food
          </h6>
        </div>

        <div className="flex flex-col gap-3 border-t-2 border-[#160B05] pt-4 text-xs font-black uppercase tracking-[0.16em] sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Lino's Food</p>
          <p>Tiktok / Facebook / WhatsApp</p>
        </div>
      </div>
    </footer>
  );
}
