import { tonightCondition, tonightObjects } from "@/lib/seed/sky";

export function SkyPlannerCard() {
  return (
    <section className="mt-8">
      <div className="section-label">Sky Planner · Алматы · сегодня ночью</div>
      <div className="glass-panel mt-4 overflow-hidden rounded-[8px]">
        <div className="relative h-[260px] border-b border-border bg-[#070b13]">
          <div className="absolute inset-0 opacity-70 [background-image:radial-gradient(#dce6ff_1px,transparent_1px)] [background-size:42px_42px]" />
          <div className="absolute inset-x-0 bottom-0 flex flex-wrap gap-2 p-5">
            {tonightObjects.map((object) => (
              <span className="rounded-full border border-blue/40 bg-black/40 px-4 py-2 font-mono text-xs text-blue-200" key={object.id}>
                {object.name} <span className="text-green-300">{object.altitudeDeg}°</span>
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-5 p-5">
          <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm md:grid-cols-5">
            <Metric label="Место" value={tonightCondition.city} />
            <Metric label="Время" value={tonightCondition.localTime} />
            <Metric label="Луна ↓" value={tonightCondition.moonSetTime} />
            <Metric label="Seeing" value={`${tonightCondition.seeing} / 5`} tone="good" />
            <Metric label="Облака" value={`${tonightCondition.cloudCover}%`} tone="good" />
          </div>
          <a className="rounded border border-blue/50 bg-blue/10 px-4 py-2 text-sm text-blue-200" href="/sky">
            Открыть планировщик →
          </a>
        </div>
      </div>
    </section>
  );
}

function Metric({ label, value, tone }: { label: string; value: string; tone?: "good" }) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase text-muted">{label}</div>
      <div className={tone === "good" ? "font-mono text-green-300" : "font-mono text-bright"}>{value}</div>
    </div>
  );
}
