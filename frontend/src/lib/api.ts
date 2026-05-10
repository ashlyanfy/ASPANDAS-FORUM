const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

type RequestOptions = {
  method?: string;
  body?: unknown;
  token?: string;
};

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = "GET", body, token } = options;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.detail ?? "Ошибка запроса");
  return data as T;
}

export type TokenResponse = { access_token: string; token_type: string };

export type UserOut = {
  id: string;
  username: string;
  email: string;
  role: string;
  is_verified: boolean;
  created_at: string;
  profile: {
    display_name: string | null;
    bio: string | null;
    avatar_url: string | null;
    location: string | null;
    telescope: string | null;
    camera: string | null;
  } | null;
};

export const api = {
  auth: {
    register: (username: string, email: string, password: string) =>
      request<TokenResponse>("/api/auth/register", {
        method: "POST",
        body: { username, email, password },
      }),
    login: (email: string, password: string) =>
      request<TokenResponse>("/api/auth/login", {
        method: "POST",
        body: { email, password },
      }),
    me: (token: string) =>
      request<UserOut>("/api/users/me", { token }),
  },
};
