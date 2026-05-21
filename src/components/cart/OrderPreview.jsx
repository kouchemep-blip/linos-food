function decodeOrder(value) {
  try {
    const json = decodeURIComponent(escape(atob(value)));
    return JSON.parse(json);
  } catch {
    return [];
  }
}

export default function OrderPreview() {
  const items = (() => {
    if (typeof window === "undefined") return [];
    const params = new URLSearchParams(window.location.search);
    const order = params.get("order");
    return order ? decodeOrder(order) : [];
  })();

  if (!items.length) return null;

  return (
    <section className="bg-[#110C08] px-5 py-10 text-[#F9F3E8]">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-[#FE9922]">
          Recap commande
        </p>
        <h1 className="mt-2 font-display text-4xl font-bold">
          Choix du client
        </h1>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article key={item.id} className="overflow-hidden rounded-2xl bg-white/10">
              <img src={item.image} alt={item.name} className="h-44 w-full object-cover" />
              <div className="p-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#FE9922]">
                  {item.code} / {item.category}
                </p>
                <h2 className="mt-1 font-display text-2xl font-bold">{item.name}</h2>
                <p className="mt-2 text-sm text-[#F0E3CC]">{item.price}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
