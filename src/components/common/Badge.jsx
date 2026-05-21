// Badge.jsx — Labels et tags du design system
// Variantes : spice | gold | herb | dark | popular | new

export default function Badge({ children, variant = "spice", className = "" }) {
  return (
    <span className={`badge badge-${variant} ${className}`}>
      {children}
    </span>
  );
}