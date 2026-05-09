export function Starfield() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 opacity-70 [background-image:radial-gradient(#c9d8ff_1px,transparent_1px)] [background-size:38px_38px]" />
      <div className="absolute inset-0 opacity-45 [background-image:radial-gradient(#ffffff_1px,transparent_1px)] [background-position:17px_23px] [background-size:91px_91px]" />
      <div className="absolute left-1/2 top-20 h-[520px] w-[720px] -translate-x-1/2 rounded-full bg-blue/10 blur-3xl" />
    </div>
  );
}
