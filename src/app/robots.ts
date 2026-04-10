import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard/", "/setup", "/auth/"],
    },
    sitemap: "https://waypoints.fyi/sitemap.xml",
  };
}
