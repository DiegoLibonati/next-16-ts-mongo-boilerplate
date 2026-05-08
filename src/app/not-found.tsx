import { redirect } from "next/navigation";

import type { JSX } from "react";

import Link from "@/components/Link/Link";

import "@/app/not-found.css";

function NotFound(): JSX.Element {
  if (process.env.NEXT_REDIRECT_IF_ROUTE_NOT_EXISTS === "true") {
    redirect("/");
  }

  return (
    <main className="not-found-page">
      <h1 className="title">404</h1>
      <p className="description">Page not found.</p>
      <nav className="links">
        <Link href="/">Go home</Link>
      </nav>
    </main>
  );
}

export default NotFound;
