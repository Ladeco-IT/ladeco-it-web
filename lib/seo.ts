const rawSiteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://ladeco-it.com").trim();

export const siteUrl = (() => {
  const withProtocol = /^https?:\/\//i.test(rawSiteUrl) ? rawSiteUrl : `https://${rawSiteUrl}`;

  try {
    // Drop the trailing slash so `${siteUrl}/path` doesn’t create `//path`.
    return new URL(withProtocol).toString().replace(/\/$/, "");
  } catch {
    throw new Error(
      `Invalid NEXT_PUBLIC_SITE_URL: "${rawSiteUrl}". Expected an absolute URL like "https://example.com".`,
    );
  }
})();

export const siteName = "Ladeco IT";

export const siteDescription =
  "Ladeco IT verzorgt computerassemblage, softwareontwikkeling en netwerkondersteuning op kantoor en bij je thuis.";

export const defaultKeywords = [
  "Ladeco IT",
  "computerassemblage",
  "softwareontwikkeling",
  "netwerkondersteuning",
  "IT service",
  "computerherstel",
  "computer support",
];

export const socialImage = "/logo-dark.png";
