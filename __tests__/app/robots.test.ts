import type { MetadataRoute } from "next";

import robots from "@/app/robots";

describe("robots", () => {
  describe("when NEXT_PUBLIC_APP_URL is set", () => {
    it("should allow all user agents", () => {
      process.env.NEXT_PUBLIC_APP_URL = "https://example.com";
      const result: MetadataRoute.Robots = robots();
      expect(result.rules).toEqual({ userAgent: "*", allow: "/" });
    });

    it("should include the sitemap URL using the env variable", () => {
      process.env.NEXT_PUBLIC_APP_URL = "https://example.com";
      const result: MetadataRoute.Robots = robots();
      expect(result.sitemap).toBe("https://example.com/sitemap.xml");
    });

    it("should build the sitemap from a different base URL", () => {
      process.env.NEXT_PUBLIC_APP_URL = "https://myapp.io";
      const result: MetadataRoute.Robots = robots();
      expect(result.sitemap).toBe("https://myapp.io/sitemap.xml");
    });
  });
});
