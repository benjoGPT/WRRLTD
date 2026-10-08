// Settings for the OpenNext adapter that turns the Next.js build into a
// Cloudflare Worker. Every page is built ahead of time, so pages are read
// straight from the static files; no extra storage (R2 or KV) is needed.
import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

const config = defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  enableCacheInterception: true,
});

// `npm run build` runs this adapter, so the adapter must call Next.js
// directly rather than `npm run build`, or it would call itself forever.
config.buildCommand = "npx next build";

export default config;
