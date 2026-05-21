const WHATSAPP_NUMBER = "+22966451342";

function encodeOrder(order) {
  const json = JSON.stringify(order);
  return btoa(unescape(encodeURIComponent(json)));
}

function getOrderUrl(items) {
  if (typeof window === "undefined") return "";

  const order = items.map((item) => ({
    id: item.id,
    code: item.code,
    name: item.name,
    price: item.price,
    category: item.category,
    image: item.image,
  }));

  return `${window.location.origin}${window.location.pathname}?order=${encodeURIComponent(encodeOrder(order))}`;
}

function getWhatsAppUrl(items) {
  const orderUrl = getOrderUrl(items);
  const totalLines = items.map(
    (item, index) => `${index + 1}. ${item.name} (${item.code}) - ${item.price}`,
  );
  const imageLines = items.map((item) => `Image ${item.code}: ${item.image}`);
  const message = [
    "Bonjour, je souhaite valider cette commande Lino's Food.",
    "",
    ...totalLines,
    "",
    `Lien recap avec images: ${orderUrl}`,
    "",
    "Images des choix:",
    ...imageLines,
  ].join("\n");

  const phone = WHATSAPP_NUMBER.replace(/\D/g, "");
  const target = phone ? `https://wa.me/${phone}` : "https://wa.me/";
  return `${target}?text=${encodeURIComponent(message)}`;
}

export default function CartDrawer({
  items,
  open,
  onClose,
  onRemove,
  onClear,
}) {
  const hasItems = items.length > 0;

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-[70] bg-[#110C08]/55 backdrop-blur-sm transition-opacity duration-300"
        style={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
        }}
        aria-hidden="true"
      />

      <aside
        className="fixed right-0 top-0 z-[80] flex h-dvh w-full max-w-[29rem] flex-col overflow-hidden bg-[#FDFAF5] shadow-[-24px_0_70px_rgba(38,18,8,0.24)] transition-transform duration-500"
        style={{
          transform: open ? "translateX(0)" : "translateX(105%)",
          transitionTimingFunction: "cubic-bezier(0.19, 1, 0.22, 1)",
          backgroundImage:
            "linear-gradient(180deg, rgba(253,250,245,0.92), rgba(249,243,232,0.96)), url('/linos-logo.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center 7rem",
          backgroundSize: "19rem auto",
        }}
        aria-label="Panier"
      >
        <div className="relative flex items-start justify-between border-b border-[#E3CDA8] px-6 py-6">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#842F00]">
              Panier
            </p>
            <h2 className="mt-1 font-display text-4xl font-bold leading-none text-[#110C08]">
              Votre commande
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-11 w-11 place-items-center rounded-full border border-[#D0BBA8] text-2xl leading-none text-[#352A20] transition hover:border-[#842F00] hover:bg-[#FFF4E0] hover:text-[#842F00]"
            aria-label="Fermer le panier"
          >
            x
          </button>
        </div>

        <div className="relative flex-1 overflow-y-auto px-6 py-5">
          {!hasItems && (
            <div className="grid h-full place-items-center text-center">
              <div>
                <p className="font-display text-3xl font-semibold text-[#352A20]">
                  Aucun plat selectionne
                </p>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-[#6B5645]">
                  Cliquez sur une carte de la section Notre carte pour ajouter un plat ici.
                </p>
              </div>
            </div>
          )}

          {hasItems && (
            <div className="space-y-4">
              {items.map((item, index) => (
                <article
                  key={`${item.id}-${index}`}
                  className="grid grid-cols-[5.5rem_1fr_auto] gap-4 rounded-2xl border border-[#E6D3B7] bg-white/80 p-3 shadow-[0_8px_20px_rgba(82,43,19,0.08)]"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-20 w-20 rounded-xl object-cover"
                  />
                  <div className="min-w-0">
                    <p className="text-[0.65rem] font-black uppercase tracking-[0.18em] text-[#9B6A38]">
                      {item.code} / {item.category}
                    </p>
                    <h3 className="mt-1 truncate font-display text-xl font-bold text-[#21140D]">
                      {item.name}
                    </h3>
                    <p className="mt-1 text-sm font-semibold text-[#842F00]">
                      {item.price}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onRemove(index)}
                    className="h-9 w-9 rounded-full text-lg text-[#8C7560] transition hover:bg-[#FFF4E0] hover:text-[#842F00]"
                    aria-label={`Retirer ${item.name}`}
                  >
                    x
                  </button>
                </article>
              ))}
            </div>
          )}
        </div>

        <div className="relative border-t border-[#E3CDA8] bg-[#F9F3E8]/92 px-6 py-5 backdrop-blur-sm">
          <div className="mb-4 flex items-center justify-between text-sm">
            <span className="font-bold uppercase tracking-[0.16em] text-[#6B5645]">
              Articles
            </span>
            <span className="font-display text-3xl font-bold text-[#110C08]">
              {items.length}
            </span>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClear}
              disabled={!hasItems}
              className="h-12 rounded-full border border-[#D0BBA8] px-5 text-sm font-bold text-[#6B5645] transition hover:border-[#842F00] hover:text-[#842F00] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Vider
            </button>
            <a
              href={hasItems ? getWhatsAppUrl(items) : undefined}
              target="_blank"
              rel="noreferrer"
              className={`flex h-12 flex-1 items-center justify-center rounded-full px-5 text-sm font-black uppercase tracking-[0.08em] transition ${
                hasItems
                  ? "bg-[#842F00] text-white shadow-[0_10px_26px_rgba(132,47,0,0.24)] hover:bg-[#5C2000]"
                  : "pointer-events-none bg-[#D0BBA8] text-white"
              }`}
            >
              Valider la commande
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
