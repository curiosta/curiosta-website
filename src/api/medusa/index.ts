import Medusa from "@medusajs/medusa-js";
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://94ddfc62420647c8a6c60a5abdd3526c@o4505316044111872.ingest.sentry.io/4505316046077952",
  integrations: [
    new Sentry.BrowserTracing({
      // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
      tracePropagationTargets: ["localhost:3000", /^https:\/\/curiosta\.com\//],
    }),
    new Sentry.Replay(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});


const medusa = new Medusa({
  baseUrl: import.meta.env.PUBLIC_BASE_URL,
  maxRetries: 3,
});

export default medusa;
