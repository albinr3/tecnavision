import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();

  return [
    { url: `${siteUrl}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/products`, lastModified, changeFrequency: "daily", priority: 0.9 },
    { url: `${siteUrl}/donde-comprar`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/sobre-nosotros`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/contacto`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/privacidad`, lastModified, changeFrequency: "yearly", priority: 0.4 },
    { url: `${siteUrl}/terminos`, lastModified, changeFrequency: "yearly", priority: 0.4 },
    { url: `${siteUrl}/cookies`, lastModified, changeFrequency: "yearly", priority: 0.4 },
  ];
}
