import type { NextConfig } from "next";
import { site } from "./src/config/site";

const nextConfig: NextConfig = {
  // Cache Components (and partial prefetching, which needs it) are left off:
  // they rely on timer behaviour that Cloudflare Workers doesn't have, and
  // every page here is built ahead of time anyway.
  poweredByHeader: false,

  async headers() {
    const headers = [
      // Basic security headers for every page
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "X-Frame-Options", value: "DENY" },
    ];
    // Until launch, tell search engines not to index anything, including
    // files like images and the sitemap that can't carry a meta tag.
    if (!site.isLive) headers.push({ key: "X-Robots-Tag", value: "noindex, nofollow" });

    return [{ source: "/:path*", headers }];
  },
};

export default nextConfig;
