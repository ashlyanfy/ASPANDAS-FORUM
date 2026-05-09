import { Plus, Search, Telescope } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden rounded-[8px] border border-border bg-[#08101d] p-8 shadow-panel md:p-12">
      <div
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(5,7,12,.98) 0%, rgba(5,7,12,.82) 42%, rgba(5,7,12,.25) 100%), url('https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1800&q=85')",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />
      <div className="relative max-w-[590px]">
        <h1 className="text-[36px] font-bold leading-[1.05] text-bright md:text-[48px]">
          Сообщество астрономов Казахстана
        </h1>
        <p className="mt-5 max-w-[520px] text-base leading-7 text-mid">
          Обсуждаем наблюдения, делимся фото, помогаем новичкам и вместе изучаем вселенную.
        </p>

        <label className="mt-8 flex h-12 max-w-[580px] items-center gap-3 rounded-[8px] border border-border2 bg-black/35 px-4 text-dim">
          <span className="sr-only">Поиск</span>
          <input
            className="min-w-0 flex-1 bg-transparent text-sm text-bright outline-none placeholder:text-dim"
            placeholder="Поиск по темам, объектам, пользователям..."
            type="search"
          />
          <Search size={20} />
        </label>

        <div className="mt-7 flex flex-wrap gap-3">
          <a className="inline-flex items-center gap-2 rounded-[8px] bg-gradient-to-r from-blue to-violet-600 px-5 py-3 text-sm font-bold text-white" href="/thread/new">
            <Plus size={20} />
            Создать тему
          </a>
          <a className="inline-flex items-center gap-2 rounded-[8px] border border-border2 bg-black/25 px-5 py-3 text-sm font-semibold text-bright" href="/log/new">
            <Telescope size={20} />
            Добавить наблюдение
          </a>
        </div>
      </div>
    </section>
  );
}
