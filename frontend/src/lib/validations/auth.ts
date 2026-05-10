import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Введите email")
    .email("Некорректный email"),
  password: z
    .string()
    .min(1, "Введите пароль"),
});

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, "Минимум 3 символа")
      .max(50, "Максимум 50 символов")
      .regex(/^[a-zA-Z0-9_-]+$/, "Только латиница, цифры, _ и -"),
    email: z
      .string()
      .min(1, "Введите email")
      .email("Некорректный email"),
    password: z
      .string()
      .min(8, "Минимум 8 символов"),
    confirmPassword: z
      .string()
      .min(1, "Подтвердите пароль"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
