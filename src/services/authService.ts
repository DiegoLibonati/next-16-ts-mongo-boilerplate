import type { DefaultResponse } from "@/types/responses";

const BASE = "/api/v1/auth";

export const authService = {
  async login(email: string, password: string): Promise<DefaultResponse> {
    const response = await fetch(`${BASE}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const data = (await response.json()) as DefaultResponse;
      throw new Error(data.message);
    }

    return (await response.json()) as DefaultResponse;
  },

  async logout(): Promise<DefaultResponse> {
    const response = await fetch(`${BASE}/logout`, { method: "POST" });

    if (!response.ok) {
      const data = (await response.json()) as DefaultResponse;
      throw new Error(data.message);
    }

    return (await response.json()) as DefaultResponse;
  },
};
