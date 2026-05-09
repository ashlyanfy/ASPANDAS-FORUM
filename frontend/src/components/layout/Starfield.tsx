export function Starfield() {
  return (
    <div aria-hidden="true" className="starfield pointer-events-none absolute inset-0 overflow-hidden">
      <div className="starfield-layer starfield-layer--far" />
      <div className="starfield-layer starfield-layer--mid" />
      <div className="starfield-layer starfield-layer--near" />
      <div className="starfield-glow" />
    </div>
  );
}
