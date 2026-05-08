import type { JSX } from "react";
import type { Metadata } from "next";

import Link from "@/components/Link/Link";

import "@/app/(pages)/about/about.css";

export const metadata: Metadata = { title: "About" };

function AboutPage(): JSX.Element {
  return (
    <main className="about-page">
      <h1 className="title">About</h1>
      <nav className="links">
        <Link href="/">← Home</Link>
      </nav>
    </main>
  );
}

export default AboutPage;
