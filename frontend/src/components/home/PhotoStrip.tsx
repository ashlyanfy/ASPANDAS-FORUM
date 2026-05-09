import type { AstroPhoto } from "@/types";

export function PhotoStrip({ photos }: { photos: AstroPhoto[] }) {
  return (
    <section className="glass-panel rounded-[8px] p-6">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-bright">Недавние астрофото</h2>
        <a className="text-sm text-violet-300" href="/astrophoto">
          Смотреть все →
        </a>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {photos.map((photo) => (
          <a className="group block" href={`/astrophoto/${photo.id}`} key={photo.id}>
            <div
              className="aspect-[4/3] rounded-[8px] border border-border bg-cover bg-center transition group-hover:border-border2"
              style={{ backgroundImage: `url('${photo.imageUrl}')` }}
            />
            <div className="mt-2 text-sm font-semibold text-bright">{photo.title}</div>
            <div className="text-xs text-dim">{photo.author.displayName}</div>
          </a>
        ))}
      </div>
    </section>
  );
}
