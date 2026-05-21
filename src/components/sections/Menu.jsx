import { menuItems } from "../../data/menuItems";
import MenuTimeline from "../MenuTimeline";
import SectionHeader from "../common/SectionHeader";

export default function Menu({ onAddToCart }) {
  return (
    <section
      id="menu"
      className="section-py overflow-hidden bg-[#F9F3E8]"
      aria-labelledby="menu-title"
    >
      <div className="container-main">
        <SectionHeader
          overline="Notre carte"
          title="Une carte suspendue"
          highlight="au geste"
          subtitle="Faites glisser la selection du chef et decouvrez une galerie de plats accrochés comme dans une penderie de maison gastronomique."
          align="center"
        />
      </div>

      <MenuTimeline items={menuItems} onAddToCart={onAddToCart} />
    </section>
  );
}
