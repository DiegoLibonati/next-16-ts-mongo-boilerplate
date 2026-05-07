"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import type { JSX } from "react";

import authService from "@/services/authService";

import "@/components/LoginForm/LoginForm.css";

const LoginForm = (): JSX.Element => {
  const [email, setEmail] = useState("alice@example.com");
  const [password, setPassword] = useState("demo1234");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await authService.login(email, password);
      router.push("/");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      setLoading(false);
    }
  }

  return (
    <form
      className="login-form"
      onSubmit={(e) => {
        void handleSubmit(e);
      }}
    >
      <div className="login-form__field">
        <label htmlFor="email" className="login-form__label">
          Email
        </label>
        <input
          id="email"
          className="login-form__input"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required
          autoComplete="email"
        />
      </div>
      <div className="login-form__field">
        <label htmlFor="password" className="login-form__label">
          Password
        </label>
        <input
          id="password"
          className="login-form__input"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
          autoComplete="current-password"
        />
      </div>
      {error && <p className="login-form__error">{error}</p>}
      <button type="submit" className="login-form__submit action" disabled={loading}>
        {loading ? "Logging in…" : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
