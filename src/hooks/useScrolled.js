import { useEffect, useState } from "react";

/**
 * useScrolled — retourne true quand l'utilisateur a scrollé
 * Utilisé pour transformer la navbar (transparente → opaque)
 * @param {number} threshold - pixels scrollés pour déclencher (défaut: 80)
 */
export function useScrolled(threshold = 80) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold);
    handler(); // vérifier l'état initial
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [threshold]);

  return scrolled;
}