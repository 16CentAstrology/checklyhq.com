---
title: Exporting traces to New Relic - Checkly Docs
displayTitle: Exporting traces to New Relic
navTitle: To New Relic
description: "Export traces from Checkly to New Relic for better observability."
weight: 21
menu:
  platform:
    parent: Export traces to 3rd party tools with Checkly - Checkly Docs
aliases:
  - "/docs/open-telemetry/exporting-traces/newrelic/"
---

1. Make sure you have the **Traces** feature enabled in your New Relic account.
2. Create an *Ingest - License* type API key in the **Administration** > **API keys** section.
3. Grab the right endpoint URL for your New Relic account. It should look like `https://otlp.nr-data.net/v1/traces`.
   Check [the full list of all New Relic OTel endpoints](https://docs.newrelic.com/docs/more-integrations/open-source-telemetry-integrations/opentelemetry/get-started/opentelemetry-set-up-your-app/#ports-and-endpoints).
4. Add the endpoint and the API key to the Checkly integration settings. The API key is added as an HTTP header named
   `api-key` with the value of your API key.

Find all the details in the [New Relic OpenTelemetry documentation](https://docs.newrelic.com/docs/more-integrations/open-source-telemetry-integrations/opentelemetry/get-started/opentelemetry-set-up-your-app/).
