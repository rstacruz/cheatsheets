---
title: How to restart nginx
link_title: Restart nginx
subtitle: Reload config and service
category: Networking
layout: snippet
last_verified_with: "nginx 1.30.8, systemd 262."
updated: 2026-11-25
links:
  - title: Controlling nginx
    url: https://nginx.org/en/docs/control.html
  - title: systemctl manual
    url: https://www.freedesktop.org/software/systemd/man/latest/systemctl.html
---

## Restarting
<!-- {: .-snippets} -->

### Reload the config
<!-- {: .-snippet} -->

```bash
sudo nginx -s reload
```
<!-- {: data-highlight="-s reload"} -->

**Applies a new config without dropping connections.** The master validates the file, starts new workers, and drains the old ones; see [controlling nginx](https://nginx.org/en/docs/control.html).

### Test before reloading
<!-- {: .-snippet} -->

```bash
sudo nginx -t
```
<!-- {: data-highlight="-t"} -->

**Checks the config before it goes live.** A bad file fails the test and leaves the running config untouched; see [command-line parameters](https://nginx.org/en/docs/switches.html).

### Reload with systemd
<!-- {: .-snippet} -->

```bash
sudo systemctl reload nginx
```
<!-- {: data-highlight="systemctl reload"} -->

**Reloads through the service manager.** The unit asks nginx to re-read the config, the same graceful reload as `nginx -s reload`; see [systemctl](https://www.freedesktop.org/software/systemd/man/latest/systemctl.html).

### Restart the service
<!-- {: .-snippet} -->

```bash
sudo systemctl restart nginx
```
<!-- {: data-highlight="systemctl restart"} -->

**Stops and starts the master process.** New connections wait while workers drain, and requests outliving the stop timeout are cut; prefer `reload` for config changes; see [systemctl](https://www.freedesktop.org/software/systemd/man/latest/systemctl.html).

### Check the status
<!-- {: .-snippet} -->

```bash
systemctl status nginx
```
<!-- {: data-highlight="systemctl status"} -->

**Shows whether nginx is running and why it last failed.** Startup errors name the config file and line; see [systemctl](https://www.freedesktop.org/software/systemd/man/latest/systemctl.html).

### Read the error log
<!-- {: .-snippet} -->

```bash
sudo tail -f /var/log/nginx/error.log
```
<!-- {: data-highlight="error.log"} -->

**Follows runtime errors as they happen.** Distro packages use `/var/log/nginx/`; source builds default to `/usr/local/nginx/logs/`; see [error_log](https://nginx.org/en/docs/ngx_core_module.html#error_log).
