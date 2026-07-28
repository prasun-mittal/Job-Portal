import * as Sentry from "@sentry/node";
import { nodeProfilingIntegration } from "@sentry/profiling-node";

Sentry.init({
  dsn: "https://a3028925b9481c9a763f87ab5e3a1cdc@o4511811932848128.ingest.us.sentry.io/4511811944448000",

  integrations: [
    nodeProfilingIntegration(),
  ],

  enableLogs: true,
  tracesSampleRate: 1.0,
  profileSessionSampleRate: 1.0,
  profileLifecycle: "trace",
});