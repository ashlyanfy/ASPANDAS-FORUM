import { Bell, ChevronDown, Mail, Search } from "lucide-react";

const navItems = [
  { label: "Форум", href: "/" },
  { label: "Sky Planner", href: "/sky" },
  { label: "Астрофото", href: "/astrophoto" },
  { label: "События", href: "/events" },
  { label: "Блоги", href: "/forum/community" },
];

export function Navbar() {
  return (
    <header className="relative z-10 border-b border-white/10 bg-[#05070c]/82 backdrop-blur-xl">
      <div className="mx-auto flex h-20 w-[min(100%-28px,1240px)] items-center gap-8">
        <a href="/" className="flex items-center gap-3" aria-label="ASPANDAS">
          <span className="grid h-9 w-9 place-items-center rounded-full border border-white/70 font-mono text-sm font-bold text-bright">
            A
          </span>
          <span className="font-mono text-[18px] font-bold tracking-[0.08em] text-bright">ASPANDAS</span>
        </a>

        <nav className="hidden flex-1 items-center gap-7 text-sm text-dim lg:flex">
          {navItems.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              className={index === 0 ? "text-violet-300" : "transition-colors hover:text-bright"}
            >
              {item.label}
            </a>
          ))}
          <button className="inline-flex items-center gap-1 transition-colors hover:text-bright" type="button">
            Ещё <ChevronDown size={14} />
          </button>
        </nav>

        <div className="ml-auto hidden items-center gap-5 text-dim md:flex">
          <Search size={20} aria-label="Поиск" />
          <Bell size={20} aria-label="Уведомления" />
          <Mail size={20} aria-label="Сообщения" />
          <button className="rounded border border-border2 px-4 py-2 text-sm text-mid transition hover:border-blue hover:text-bright" type="button">
            Войти
          </button>
          <button className="rounded bg-blue px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110" type="button">
            Регистрация
          </button>
        </div>
      </div>
    </header>
  );
}
