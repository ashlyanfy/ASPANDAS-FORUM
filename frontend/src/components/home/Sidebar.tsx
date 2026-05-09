import type { AstroEvent, SkyObject, ThreadSummary } from "@/types";

export function Sidebar({
  activeThreads,
  skyObjects,
  events,
}: {
  activeThreads: ThreadSummary[];
  skyObjects: SkyObject[];
  events: AstroEvent[];
}) {
  return (
    <aside className="space-y-5">
      <section className="glass-panel rounded-[8px] p-6">
        <h2 className="text-lg font-bold text-bright">Активное сейчас</h2>
        <div className="mt-4 space-y-4">
          {activeThreads.slice(0, 5).map((thread) => (
            <a className="block" href={`/thread/${thread.id}`} key={thread.id}>
              <span className="block text-sm font-medium text-bright">{thread.title}</span>
              <span className="text-xs text-dim">{thread.replyCount} ответов</span>
            </a>
          ))}
        </div>
      </section>

      <section className="glass-panel rounded-[8px] p-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-lg font-bold text-bright">Сегодня на небе</h2>
          <a className="text-sm text-violet-300" href="/sky">
            Подробнее →
          </a>
        </div>
        <div className="mt-5 space-y-4">
          {skyObjects.map((object) => (
            <div className="flex items-start justify-between gap-4" key={object.id}>
              <div>
                <div className="font-semibold text-bright">{object.name}</div>
                <div className="text-xs text-dim">{object.note}</div>
              </div>
              <span className="font-mono text-sm text-mid">{object.altitudeDeg}°</span>
            </div>
          ))}
        </div>
      </section>

      <section className="glass-panel rounded-[8px] p-6">
        <h2 className="text-lg font-bold text-bright">Ближайшие события</h2>
        <div className="mt-4 space-y-4">
          {events.map((event) => (
            <a className="block border-l border-blue/70 pl-3" href="/events" key={event.id}>
              <span className="block text-sm font-semibold text-bright">{event.title}</span>
              <span className="text-xs leading-5 text-dim">{event.summary}</span>
            </a>
          ))}
        </div>
      </section>
    </aside>
  );
}
