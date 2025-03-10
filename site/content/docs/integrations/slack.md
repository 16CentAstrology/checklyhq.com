---
title: Sending Alerts to Slack and Checkly - Checkly Docs
displayTitle: Sending Alerts to Slack
navTitle: Slack
weight: 55
menu:
  integrations:
    parent: "Integrations"
---

Setting up Slack as an alerting channel is simple:

1. [Create an Incoming WebHook integration](https://my.slack.com/services/new/incoming-webhook/) in Slack by selecting a default channel for your alerts. You'll see a WebHook URL generated by Slack. Copy it.
2. In Checkly, go to [Alert Settings -> Add More Channels -> Slack](https://app.checklyhq.com/alert-settings/channels/new/slack/) and paste your URL to add it as an alerting channel:

![Add a Slack WebHook URL to Checkly](/docs/images/alerting/slack.png)

You have the option to customize the default channel you've set in Slack by setting a channel name while creating your Alert Channel. You can use a **#public-channel-name**, **@username** for Direct Messages or a channel ID. If you omit this field, the message will arrive in the default channel you've picked while creating the Incoming WebHook URL in Slack.

By customizing the channel name, alerting options & checks for that alert channel, you can use a single Incoming WebHook URL for multiple scenarios.

>[!WARNING]
> If you’re using a free Slack workspace, be aware of [message limits](https://slack.com/help/articles/115002422943-Usage-limits-for-free-workspaces). Exceeding these limits may prevent new alerts from being delivered.

## Example Failed Slack Alert

We provide a lot of information in the initial Slack message including links to the check and check result as well as the whole response body.

![A slack message showing a failed alert](/docs/images/alerting/slack-failed-check.png)

## Example Recovered Slack Alert

From the recovered Slack message, you can see the timestamp as well as a link to the check itself.

![A slack message showing a recovered alert](/docs/images/alerting/slack-recovered-check.png)
