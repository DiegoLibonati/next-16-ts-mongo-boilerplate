import { redirect } from "next/navigation";

import type { JSX } from "react";
import type { Metadata } from "next";

import { getSession } from "@/server/helpers/get_session.helper";

import LoginForm from "@/components/LoginForm/LoginForm";

import "@/app/(pages)/login/login.css";

export const metadata: Metadata = { title: "Login" };

async function LoginPage(): Promise<JSX.Element> {
  const session = await getSession();
  if (session) redirect("/");

  return (
    <main className="login-page">
      <h1 className="title">Login</h1>
      <p className="hint">Demo credentials are pre-filled.</p>
      <LoginForm />
    </main>
  );
}

export default LoginPage;
