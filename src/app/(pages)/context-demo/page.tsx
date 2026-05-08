import type { JSX } from "react";
import type { Metadata } from "next";

import Link from "@/components/Link/Link";
import CounterWidget from "@/components/CounterWidget/CounterWidget";

import "@/app/(pages)/context-demo/context-demo.css";

export const metadata: Metadata = { title: "Context Demo" };

function ContextPage(): JSX.Element {
  return (
    <main className="context-page">
      <h1 className="title">Context Demo</h1>
      <CounterWidget />
      <nav className="links">
        <Link href="/">← Home</Link>
      </nav>
    </main>
  );
}

export default ContextPage;
