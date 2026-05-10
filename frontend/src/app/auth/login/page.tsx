import { LoginForm } from "@/components/auth/LoginForm";
import { Starfield } from "@/components/layout/Starfield";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Войти — ASPANDAS",
};

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 py-12">
      <Starfield />

      <div className="relative z-10 w-full max-w-[420px]">
        {/* Логотип */}
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full border border-white/70 font-mono text-sm font-bold text-bright">
              A
            </span>
            <span className="font-mono text-xl font-bold tracking-[0.08em] text-bright">ASPANDAS</span>
          </Link>
          <p className="mt-3 text-sm text-dim">Сообщество астрономов Казахстана</p>
        </div>

        {/* Карточка */}
        <div className="glass-panel rounded-[12px] p-8">
          <h1 className="mb-1 text-xl font-bold text-bright">Добро пожаловать</h1>
          <p className="mb-6 text-sm text-dim">Войдите в свой аккаунт</p>

          <LoginForm />

          <div className="mt-6 text-center text-sm text-dim">
            Нет аккаунта?{" "}
            <Link href="/auth/register" className="font-medium text-mid hover:text-bright transition-colors">
              Зарегистрироваться
            </Link>
          </div>
        </div>

        {/* Разделитель OAuth — задел на будущее */}
        <div className="mt-4 text-center text-xs text-dim">
          Google OAuth — скоро
        </div>
      </div>
    </div>
  );
}
