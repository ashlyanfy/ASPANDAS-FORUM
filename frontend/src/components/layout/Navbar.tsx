"use client";

import { Bell, ChevronDown, LogOut, Mail, Search, User } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/store/auth.store";

const navItems = [
  { label: "Форум", href: "/" },
  { label: "Sky Planner", href: "/sky" },
  { label: "Астрофото", href: "/astrophoto" },
  { label: "События", href: "/events" },
  { label: "Блоги", href: "/forum/community" },
];

export function Navbar() {
  const { user, logout } = useAuthStore();

  return (
    <header className="relative z-10 border-b border-white/10 bg-[#05070c]/82 backdrop-blur-xl">
      <div className="mx-auto flex h-20 w-[min(100%-28px,1240px)] items-center gap-8">
        <Link href="/" className="flex items-center gap-3" aria-label="ASPANDAS">
          <span className="grid h-9 w-9 place-items-center rounded-full border border-white/70 font-mono text-sm font-bold text-bright">
            A
          </span>
          <span className="font-mono text-[18px] font-bold tracking-[0.08em] text-bright">ASPANDAS</span>
        </Link>

        <nav className="hidden flex-1 items-center gap-7 text-sm text-dim lg:flex">
          {navItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={index === 0 ? "text-violet-300" : "transition-colors hover:text-bright"}
            >
              {item.label}
            </Link>
          ))}
          <button className="inline-flex items-center gap-1 transition-colors hover:text-bright" type="button">
            Ещё <ChevronDown size={14} />
          </button>
        </nav>

        <div className="ml-auto hidden items-center gap-5 text-dim md:flex">
          <Search size={20} aria-label="Поиск" className="cursor-pointer hover:text-bright transition-colors" />

          {user ? (
            <>
              <Bell size={20} aria-label="Уведомления" className="cursor-pointer hover:text-bright transition-colors" />
              <Mail size={20} aria-label="Сообщения" className="cursor-pointer hover:text-bright transition-colors" />
              <Link
                href={`/profile/${user.username}`}
                className="flex items-center gap-2 rounded border border-border px-3 py-1.5 text-sm text-mid transition hover:border-border2 hover:text-bright"
              >
                <User size={16} />
                {user.profile?.display_name ?? user.username}
              </Link>
              <button
                onClick={logout}
                className="text-dim hover:text-rose-400 transition-colors"
                aria-label="Выйти"
              >
                <LogOut size={20} />
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="rounded border border-border2 px-4 py-2 text-sm text-mid transition hover:border-blue hover:text-bright"
              >
                Войти
              </Link>
              <Link
                href="/auth/register"
                className="rounded bg-blue px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110"
              >
                Регистрация
              </Link>
            </>
          )}
        </div>

        {/* Мобильное меню */}
        <div className="ml-auto flex items-center gap-3 md:hidden">
          {user ? (
            <Link href={`/profile/${user.username}`} className="text-dim hover:text-bright">
              <User size={22} />
            </Link>
          ) : (
            <Link
              href="/auth/login"
              className="rounded border border-border2 px-3 py-1.5 text-sm text-mid"
            >
              Войти
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
