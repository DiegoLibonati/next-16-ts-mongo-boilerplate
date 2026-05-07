import type { Metadata } from "next";

import type { JSX } from "react";
import type { RootLayoutProps } from "@/types/props";

import "@/app/globals.css";

export const metadata: Metadata = {
  title: {
    default: "Next 16 TS Mongo Boilerplate",
    template: "%s | Next 16 TS Mongo Boilerplate",
  },
  description:
    "Next 16 Ts Mongo Boilerplate is a production-ready starting point for building full-stack web applications with Next.js, TypeScript, and MongoDB.",
};

export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
