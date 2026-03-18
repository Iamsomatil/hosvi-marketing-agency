import { MetadataRoute } from 'next'

const URL = "https://hosvi.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/",
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms-of-service",
    "/cookies",
  ];

  return routes.map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: route === "/" ? 1 : 0.7,
  }));
}
