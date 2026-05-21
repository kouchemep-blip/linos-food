import "./index.css";
import { useEffect, useState } from "react";
import Navbar       from "./components/layout/Navbar";
import Footer       from "./components/layout/Footer";
import Hero         from "./components/sections/Hero";
import Services     from "./components/sections/Services";
import Menu         from "./components/sections/Menu";
import Events       from "./components/sections/Events";
import Testimonials from "./components/sections/Testimonials";
import Contact      from "./components/sections/Contact";
import CartDrawer   from "./components/cart/CartDrawer";
import OrderPreview from "./components/cart/OrderPreview";
import LogoLoader   from "./components/common/LogoLoader";

export default function App() {
  const [loaderPhase, setLoaderPhase] = useState("intro");
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((current) => [...current, item]);
  };

  const removeFromCart = (indexToRemove) => {
    setCartItems((current) => current.filter((_, index) => index !== indexToRemove));
  };

  useEffect(() => {
    const flyTimer = window.setTimeout(() => setLoaderPhase("fly"), 1900);
    const doneTimer = window.setTimeout(() => setLoaderPhase("done"), 2950);

    return () => {
      window.clearTimeout(flyTimer);
      window.clearTimeout(doneTimer);
    };
  }, []);

  return (
    <div className="min-h-screen">
      <LogoLoader phase={loaderPhase} />
      <Navbar
        cartCount={cartItems.length}
        logoSettled={loaderPhase === "done"}
        onCartOpen={() => setCartOpen(true)}
      />
      <main>
        <OrderPreview />
        <Hero />
        <Menu onAddToCart={addToCart} />
        <Services />
        <Events />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <CartDrawer
        items={cartItems}
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onRemove={removeFromCart}
        onClear={() => setCartItems([])}
      />
    </div>
  );
}
