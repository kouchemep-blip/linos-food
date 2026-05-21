// Button.jsx — Composant bouton du design system
// Variantes : primary | secondary | outline-light | dark
// Tailles   : sm | md (défaut) | lg

export default function Button({
  children,
  variant = "primary",
  size = "md",
  onClick,
  href,
  type = "button",
  disabled = false,
  leftIcon,
  rightIcon,
  className = "",
}) {
  const base = "btn";
  const variantClass = `btn-${variant}`;
  const sizeClass = size !== "md" ? `btn-${size}` : "";
  const classes = [base, variantClass, sizeClass, className].filter(Boolean).join(" ");

  if (href) {
    return (
      <a href={href} className={classes}>
        {leftIcon && <span>{leftIcon}</span>}
        {children}
        {rightIcon && <span>{rightIcon}</span>}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {leftIcon && <span>{leftIcon}</span>}
      {children}
      {rightIcon && <span>{rightIcon}</span>}
    </button>
  );
}