// This file configures the initialization of Sentry for edge features (middleware, edge routes, and so on).
// The config you add here will be used whenever one of the edge features is loaded.
// Note that this config is unrelated to the Vercel Edge Runtime and is also required when running locally.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://a89186398515984cac4fb49bfd54b69c@o4509007347777536.ingest.us.sentry.io/4509190188695552",
  enabled: process.env.NODE_ENV === "production",

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});
