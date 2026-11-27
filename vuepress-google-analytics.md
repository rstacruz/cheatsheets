---
title: How to add Google Analytics to VuePress
link_title: VuePress Google Analytics
subtitle: Track page views with GA4
logo: { src: /assets/logos/vue.svg }
category: JavaScript libraries
layout: snippet
last_verified_with: "VuePress 2.0.0-rc.33, @vuepress/plugin-google-analytics 2.0.0-rc.142."
updated: 2026-11-27
links:
  - title: Google Analytics plugin
    url: https://ecosystem.vuejs.press/plugins/analytics/google-analytics.html
  - title: GA4 events
    url: https://developers.google.com/analytics/devguides/collection/ga4/events
---

## Adding Analytics
<!-- {: .-snippets} -->

### Install the plugin
<!-- {: .-snippet} -->

```sh
pnpm add -D \
  @vuepress/plugin-google-analytics@next
```
<!-- {: data-highlight="@vuepress/plugin-google-analytics@next"} -->

**Adds the GA4 integration package.** Use the plugin release tagged `@next`, which matches VuePress 2. See [google-analytics](https://ecosystem.vuejs.press/plugins/analytics/google-analytics.html).

### Add the measurement ID
<!-- {: .-snippet} -->

```ts
import {
  googleAnalyticsPlugin,
} from '@vuepress/plugin-google-analytics'

export default {
  plugins: [
    googleAnalyticsPlugin({
      id: 'G-XXXXXXXXXX',
    }),
  ],
}
```
<!-- {: data-highlight="G-XXXXXXXXXX"} -->

**Loads `gtag.js` with your GA4 ID.** Use a `G-` measurement ID, not the old `UA-` tracking ID; `debug: true` sends events to DebugView. See [usage](https://ecosystem.vuejs.press/plugins/analytics/google-analytics.html#usage).
