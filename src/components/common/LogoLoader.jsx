export default function LogoLoader({ phase }) {
  if (phase === "done") return null;

  const isFly = phase === "fly";

  return (
    <div
      className={`logo-loader ${isFly ? "logo-loader--fly" : "logo-loader--intro"} fixed inset-0 z-[120] grid place-items-center`}
      aria-hidden="true"
    >
      <div className="logo-loader__stage relative">
        <div className="logo-loader__shine relative overflow-hidden">
          <img
            src="/linos-logo.png"
            alt=""
            className="logo-loader__mark h-60 w-60 sm:h-80 sm:w-80"
          />
        </div>
      </div>
    </div>
  );
}
