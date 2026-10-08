// Settings for the OpenNext adapter that turns the Next.js build into a
// Cloudflare Worker. Every page is built ahead of time, so pages are read
// straight from the static files; no extra storage (R2 or KV) is needed.
import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  enableCacheInterception: true,
});
