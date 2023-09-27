import * as Sentry from "@sentry/node";
import { ProfilingIntegration } from "@sentry/profiling-node";

Sentry.init({
  dsn: 'https://83b4b286fee9cf7fae54e150245977cf@o4505923278995456.ingest.sentry.io/4505923292495872',
  integrations: [
    new ProfilingIntegration(),
  ],
  tracesSampleRate: 1.0, 
  profilesSampleRate: 1.0, 
});