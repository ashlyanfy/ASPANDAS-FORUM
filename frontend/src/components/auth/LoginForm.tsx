"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginFormData } from "@/lib/validations/auth";
import { useAuthStore } from "@/store/auth.store";
import { cn } from "@/lib/utils";

export function LoginForm() {
  const router = useRouter();
  const { login, isLoading } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setServerError(null);
    try {
      await login(data.email, data.password);
      router.push("/");
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Ошибка входа");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      {serverError && (
        <div className="rounded-[8px] border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
          {serverError}
        </div>
      )}

      <Field label="Email" error={errors.email?.message}>
        <input
          {...register("email")}
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          className={inputClass(!!errors.email)}
        />
      </Field>

      <Field label="Пароль" error={errors.password?.message}>
        <div className="relative">
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="••••••••"
            className={cn(inputClass(!!errors.password), "pr-11")}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-dim hover:text-bright"
            aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </Field>

      <div className="flex justify-end">
        <a href="/auth/forgot-password" className="text-sm text-dim hover:text-bright transition-colors">
          Забыли пароль?
        </a>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="flex w-full items-center justify-center gap-2 rounded-[8px] bg-blue px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-60"
      >
        {isLoading && <Loader2 size={16} className="animate-spin" />}
        Войти
      </button>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-mid">{label}</label>
      {children}
      {error && <p className="text-xs text-rose-400">{error}</p>}
    </div>
  );
}

function inputClass(hasError: boolean) {
  return cn(
    "w-full rounded-[8px] border bg-black/30 px-4 py-2.5 text-sm text-bright outline-none placeholder:text-dim transition",
    "focus:ring-1",
    hasError
      ? "border-rose-500/60 focus:border-rose-500 focus:ring-rose-500/30"
      : "border-border focus:border-blue/60 focus:ring-blue/20",
  );
}
