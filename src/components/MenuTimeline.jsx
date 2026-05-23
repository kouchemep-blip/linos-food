import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";

function HangingCard({ item, index, sway, onAddToCart }) {
  const controls = useAnimationControls();

  useEffect(() => {
    if (!sway.key) return;

    const amplitude = sway.direction * sway.force * (2.35 + index * 0.08);
    const correction = sway.direction * sway.force * 0.42;

    controls.start({
      rotate: [
        0,
        amplitude * 0.08,
        amplitude * 0.45,
        amplitude,
        -amplitude * 0.34,
        correction,
        -correction * 0.22,
        0,
      ],
      y: [0, 0.18, 0.54, 0.72, -0.32, 0.18, -0.06, 0],
      transition: {
        duration: 2.25 + Math.min(index * 0.045, 0.32),
        delay: Math.min(index * 0.04, 0.22),
        ease: "easeInOut",
        times: [0, 0.16, 0.3, 0.46, 0.64, 0.78, 0.9, 1],
      },
    });
  }, [controls, index, sway]);

  return (
    <motion.article
      animate={controls}
      onTap={() => onAddToCart?.(item)}
      whileHover={{
        y: -8,
        scale: 1.018,
        transition: { duration: 0.28, ease: "easeOut" },
      }}
      className="group relative w-[18.5rem] shrink-0 cursor-grab select-none active:cursor-grabbing sm:w-[20.5rem] lg:w-[22rem]"
      style={{ transformOrigin: "50% -72px" }}
    >
      <div className="absolute left-1/2 top-[-4.55rem] z-20 h-[4.65rem] w-px -translate-x-1/2 bg-gradient-to-b from-[#3B2518] via-[#9A6A34] to-[#6B3B17] shadow-[0_0_8px_rgba(90,54,23,0.24)]" />
      <div className="absolute left-1/2 top-[-5.05rem] z-30 h-10 w-14 -translate-x-1/2 rounded-t-full border-[5px] border-b-0 border-[#6C4525] bg-transparent shadow-[inset_0_2px_0_rgba(255,230,178,0.32),0_6px_14px_rgba(38,20,9,0.22)]" />
      <div className="absolute left-1/2 top-[-1.02rem] z-30 h-2 w-24 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#5C3218] via-[#BE8440] to-[#5C3218] shadow-[0_5px_12px_rgba(50,26,10,0.18)]" />
      <div className="absolute left-1/2 top-[-3.22rem] z-40 -translate-x-1/2 rounded-full border border-[#E0B36E]/70 bg-[#341A0D] px-3 py-1 text-[0.64rem] font-black uppercase tracking-[0.18em] text-[#F7D99C] shadow-[0_8px_18px_rgba(45,22,8,0.24)]">
        {item.code}
      </div>

      <div className="overflow-hidden rounded-[1.35rem] border border-[#E9D6B9]/90 bg-white/86 shadow-[0_18px_40px_rgba(82,43,19,0.14),0_4px_14px_rgba(82,43,19,0.08)] backdrop-blur">
        <div className="relative h-52 overflow-hidden bg-[#E9D8BF]">
          <img
            src={item.image}
            alt={item.name}
            draggable="false"
            loading="lazy" // ← ajouter
            decoding="async" // ← ajouter
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.055]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#160B05]/42 via-transparent to-transparent" />
          <span className="absolute bottom-4 left-4 rounded-full border border-white/35 bg-white/86 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#6B2C18] shadow-sm backdrop-blur">
            {item.category}
          </span>
        </div>

        <div className="flex min-h-[13.2rem] flex-col p-6">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h3 className="font-display text-2xl font-semibold leading-tight text-[#21140D]">
              {item.name}
            </h3>
            <span className="shrink-0 rounded-full bg-[#FFF4E0] px-3 py-1 font-display text-lg font-bold text-[#842F00]">
              {item.price}
            </span>
          </div>
          <p className="font-accent text-[0.96rem] italic leading-relaxed text-[#6B5645]">
            {item.description}
          </p>
          <div className="mt-auto pt-6">
            <div className="h-px bg-gradient-to-r from-transparent via-[#D9B98E] to-transparent" />
            <div className="mt-4 flex items-center justify-between gap-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9B6A38]">
                Selection du chef
              </p>
              <span className="rounded-full bg-[#842F00] px-3 py-1.5 text-[0.68rem] font-black uppercase tracking-[0.12em] text-white opacity-90 transition group-hover:bg-[#5C2000]">
                Ajouter
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function MenuTimeline({ items, onAddToCart }) {
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const [dragLimit, setDragLimit] = useState(0);
  const [sway, setSway] = useState({ key: 0, direction: 1, force: 0.45 });

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return undefined;

    const measure = () => {
      const viewportWidth = viewport.offsetWidth;
      const trackWidth = track.scrollWidth;
      setDragLimit(Math.max(trackWidth - viewportWidth, 0));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    observer.observe(track);

    return () => observer.disconnect();
  }, [items.length]);

  const handleDragEnd = (_, info) => {
    const velocity = info.velocity.x;
    const offset = info.offset.x;
    const gesture = velocity || offset || 1;
    const direction = gesture < 0 ? -1 : 1;
    const force = Math.min(Math.max(Math.abs(velocity) / 2200, 0.12), 0.48);

    setSway({
      key: Date.now(),
      direction,
      force,
    });
  };

  return (
    <div className="relative mx-[calc(50%-50vw)] overflow-hidden px-5 pb-4 pt-24 sm:px-8 lg:px-12">
      <div className="pointer-events-none absolute left-0 right-0 top-[4.35rem] z-10 mx-auto h-7 w-[calc(100%-2.5rem)] max-w-[86rem] rounded-full border border-[#24130B]/35 bg-[linear-gradient(180deg,#6A4026_0%,#2A1710_42%,#130B07_58%,#5D3820_100%)] shadow-[inset_0_2px_1px_rgba(255,231,184,0.35),inset_0_-5px_9px_rgba(0,0,0,0.34),0_18px_28px_rgba(62,35,18,0.2)] sm:h-8" />
      <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-16 bg-gradient-to-r from-[#F9F3E8] to-transparent sm:w-28" />
      <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-16 bg-gradient-to-l from-[#F9F3E8] to-transparent sm:w-28" />

      <div
        ref={viewportRef}
        className="relative z-0 mx-auto max-w-[88rem] overflow-hidden py-3"
      >
        <motion.div
          ref={trackRef}
          drag="x"
          dragConstraints={{ left: -dragLimit, right: 0 }}
          dragElastic={0.08}
          dragMomentum
          dragTransition={{
            power: 0.18,
            timeConstant: 520,
            modifyTarget: (target) => Math.min(0, Math.max(-dragLimit, target)),
          }}
          onDragEnd={handleDragEnd}
          className="flex w-max gap-6 px-[max(1rem,calc((100vw-82rem)/2))] pb-8 pt-8 sm:gap-8"
        >
          {items.map((item, index) => (
            <HangingCard
              key={item.id}
              item={item}
              index={index}
              sway={sway}
              onAddToCart={onAddToCart}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
