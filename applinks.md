---
title: Applinks
subtitle: Deep-link metadata standard
category: HTML
last_verified_with: "App Links 1.0 metadata spec."
updated: 2026-11-24
---

## Metadata

### iOS

```html
<meta property="al:ios:url" content="applinks://docs" />
<meta property="al:ios:app_store_id" content="12345" />
<meta property="al:ios:app_name" content="App Links" />
```

`al:ios:url` is required; swap the prefix for `al:iphone` or `al:ipad` to target one device.

### Android

```html
<meta property="al:android:url" content="applinks://docs" />
<meta property="al:android:package" content="org.applinks" />
<meta property="al:android:app_name" content="App Links" />
```

`al:android:package` is required; `al:android:class` names the activity to open.

### Web fallback

```html
<meta property="al:web:url" content="https://example.com/docs" />
<meta property="al:web:should_fallback" content="false" />
```

`al:web:url` defaults to the page URL, and `should_fallback` defaults to `true`.

### Windows

```html
<meta property="al:windows:url" content="applinks://docs" />
<meta property="al:windows:app_name" content="App Links" />
```

Use the `al:windows_universal` or `al:windows_phone` prefix for those platforms; `app_id` takes a GUID.

## Reference

### Device types

- `ios`
- `iphone`
- `ipad`
- `android`
- `windows_phone`
- `windows`
- `windows_universal`
- `web`
<!-- {: .-enum-wide} -->

### Navigation

```json
{
  "target_url": "https://example.com/docs",
  "version": "1.0",
  "extras": { "myapp_token": "t0kEn" }
}
```

The linking app sends this object URL-encoded as an `al_applink_data` query parameter, or in the intent extras on Android.

### Crawling

```http
Prefer-Html-Meta-Tags: al
```

Ask for the `al:` tags with this request header.

### Status

App Links 1.0 shipped in 2014 and applinks.org now redirects to Facebook's page for it. iOS and Android moved on to verified links: [Universal Links](https://developer.apple.com/documentation/xcode/allowing-apps-and-websites-to-link-to-your-content) and [Android App Links](https://developer.android.com/training/app-links).
