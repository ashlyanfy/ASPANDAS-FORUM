"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { api, type UserOut } from "@/lib/api";

type AuthState = {
  token: string | null;
  user: UserOut | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  fetchMe: () => Promise<void>;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isLoading: false,

      login: async (email, password) => {
        set({ isLoading: true });
        try {
          const { access_token } = await api.auth.login(email, password);
          set({ token: access_token });
          await get().fetchMe();
        } finally {
          set({ isLoading: false });
        }
      },

      register: async (username, email, password) => {
        set({ isLoading: true });
        try {
          const { access_token } = await api.auth.register(username, email, password);
          set({ token: access_token });
          await get().fetchMe();
        } finally {
          set({ isLoading: false });
        }
      },

      logout: () => set({ token: null, user: null }),

      fetchMe: async () => {
        const token = get().token;
        if (!token) return;
        const user = await api.auth.me(token);
        set({ user });
      },
    }),
    {
      name: "aspandas-auth",
      partialize: (state) => ({ token: state.token, user: state.user }),
    },
  ),
);
