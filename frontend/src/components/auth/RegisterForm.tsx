"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { registerSchema, type RegisterFormData } from "@/lib/validations/auth";
import { useAuthStore } from "@/store/auth.store";
import { cn } from "@/lib/utils";

export function RegisterForm() {
  const router = useRouter();
  const { register: registerUser, isLoading } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const password = watch("password", "");

  const onSubmit = async (data: RegisterFormData) => {
    setServerError(null);
    try {
      await registerUser(data.username, data.email, data.password);
      router.push("/");
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Ошибка регистрации");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      {serverError && (
        <div className="rounded-[8px] border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
          {serverError}
        </div>
      )}

      <Field label="Имя пользователя" error={errors.username?.message} hint="Только латиница, цифры, _ и -">
        <input
          {...register("username")}
          type="text"
          autoComplete="username"
          placeholder="stargazer_42"
          className={inputClass(!!errors.username)}
        />
      </Field>

      <Field label="Email" error={errors.email?.message}>
        <input
          {...register("email")}
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          className={inputClass(!!errors.email)}
        />
      </Field>

      <Field label="Пароль" error={errors.password?.message} hint="Минимум 8 символов">
        <div className="relative">
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
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
        <PasswordStrength password={password} />
      </Field>

      <Field label="Подтвердите пароль" error={errors.confirmPassword?.message}>
        <input
          {...register("confirmPassword")}
          type={showPassword ? "text" : "password"}
          autoComplete="new-password"
          placeholder="••••••••"
          className={inputClass(!!errors.confirmPassword)}
        />
      </Field>

      <button
        type="submit"
        disabled={isLoading}
        className="flex w-full items-center justify-center gap-2 rounded-[8px] bg-blue px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-60"
      >
        {isLoading && <Loader2 size={16} className="animate-spin" />}
        Создать аккаунт
      </button>

      <p className="text-center text-xs text-dim">
        Регистрируясь, вы соглашаетесь с{" "}
        <a href="/terms" className="text-mid hover:text-bright transition-colors">
          правилами сообщества
        </a>
      </p>
    </form>
  );
}

function PasswordStrength({ password }: { password: string }) {
  if (!password) return null;

  const strength = getStrength(password);
  const labels = ["Слабый", "Средний", "Хороший", "Сильный"];
  const colors = ["bg-rose-500", "bg-yellow-500", "bg-blue/80", "bg-green-500"];

  return (
    <div className="mt-2 space-y-1">
      <div className="flex gap-1">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={cn(
              "h-1 flex-1 rounded-full transition-all",
              i < strength ? colors[strength - 1] : "bg-border",
            )}
          />
        ))}
      </div>
      <p className="text-xs text-dim">{labels[strength - 1]}</p>
    </div>
  );
}

function getStrength(password: string): number {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return Math.max(score, 1);
}

function Field({
  label,
  error,
  hint,
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-mid">{label}</label>
      {children}
      {error ? (
        <p className="text-xs text-rose-400">{error}</p>
      ) : hint ? (
        <p className="text-xs text-dim">{hint}</p>
      ) : null}
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
