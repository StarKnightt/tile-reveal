import type { NextConfig } from "next";

// Static export. On GitHub Pages the site lives under /tile-reveal, so the
// deploy workflow sets GITHUB_PAGES=1 to enable the basePath.
const isPages = process.env.GITHUB_PAGES === "1";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: isPages ? "/tile-reveal" : "",
  trailingSlash: true,
};

export default nextConfig;
