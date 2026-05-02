import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Next 16 TS Boilerplate",
    short_name: "Next16TS",
    description:
      "Next 16 Ts Boilerplate is a production-ready starting point for building full-stack web applications with Next.js, TypeScript, and MongoDB.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
