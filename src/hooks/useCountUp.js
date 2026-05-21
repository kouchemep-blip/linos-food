import { useEffect, useRef, useState } from "react";

/**
 * useCountUp — anime un nombre de 0 à `target` quand `start` devient true
 * @param {number} target  — valeur finale
 * @param {number} duration — durée en ms (défaut 1800)
 * @param {boolean} start  — déclenche l'animation
 */
export function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!start) return;

    // Extraire la partie numérique (ex: "200+" → 200, "4.9" → 4.9)
    const numeric = parseFloat(String(target).replace(/[^0-9.]/g, ""));
    const isDecimal = String(target).includes(".");
    const startTime = performance.now();

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo pour un effet rapide puis qui ralentit
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = eased * numeric;

      setCount(isDecimal ? parseFloat(current.toFixed(1)) : Math.floor(current));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setCount(numeric);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [start, target, duration]);

  return count;
}