---
title: How to see a Kubernetes pod's previous logs
link_title: Kubernetes previous logs
subtitle: Logs from a crashed container
category: Containers
layout: snippet
last_verified_with: "kubectl 1.37.2, Kubernetes 1.32."
updated: 2026-11-27
links:
  - title: kubectl logs
    url: https://kubernetes.io/docs/reference/kubectl/generated/kubectl_logs/
---

## Reading old logs
<!-- {: .-snippets} -->

### Previous container
<!-- {: .-snippet} -->

```bash
kubectl logs --previous web-0
```
<!-- {: data-highlight="--previous"} -->

**Reads the log of the container instance that ended.** When a container crashes and restarts, the current logs start empty, so the error only survives with `--previous`. See [kubectl logs](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_logs/).

### Choose a container
<!-- {: .-snippet} -->

```bash
kubectl logs --previous -c api web-0
```
<!-- {: data-highlight="-c api"} -->

**Picks one container in a multi-container pod.** Without `-c`, kubectl refuses to guess and lists the container names. See [kubectl logs](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_logs/).

### Whole deployment
<!-- {: .-snippet} -->

```bash
kubectl logs --previous -l app=web \
  --max-log-requests=5
```
<!-- {: data-highlight="-l app=web"} -->

**Reads the previous logs of every matching pod.** `--max-log-requests` caps how many pods it opens at once. See [kubectl logs](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_logs/).

### Follow the restarts
<!-- {: .-snippet} -->

```bash
kubectl logs -f web-0
```
<!-- {: data-highlight="-f"} -->

**Streams the current container's output.** A restart ends the stream, so run `--previous` afterwards to read what the crashed instance printed. See [kubectl logs](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_logs/).
