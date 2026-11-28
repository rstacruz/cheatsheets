---
title: How to restart a Kubernetes deployment
link_title: Kubernetes restart deployment
subtitle: Restart pods without a rebuild
logo: { src: /assets/logos/kubernetes.svg }
category: Containers
layout: snippet
last_verified_with: "kubectl 1.37.2, Kubernetes 1.32."
updated: 2026-11-28
links:
  - title: kubectl rollout restart
    url: https://kubernetes.io/docs/reference/kubectl/generated/kubectl_rollout/kubectl_rollout_restart/
---

## Restarting pods
<!-- {: .-snippets} -->

### Restart a deployment
<!-- {: .-snippet} -->

```bash
kubectl rollout restart deploy/web
```
<!-- {: data-highlight="kubectl rollout restart"} -->

**Rolls the deployment's pods gradually.** It works by updating a pod template annotation, so no manifest edit is needed and the deployment records a new revision. See [kubectl rollout restart](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_rollout/kubectl_rollout_restart/).

### Wait for it to finish
<!-- {: .-snippet} -->

```bash
kubectl rollout status deploy/web
```
<!-- {: data-highlight="rollout status"} -->

**Blocks until pods are ready.** Use it after a restart to confirm the deployment settled before moving on. See [kubectl rollout status](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_rollout/kubectl_rollout_status/).

### Restart everything in a namespace
<!-- {: .-snippet} -->

```bash
kubectl rollout restart deployment -n staging
```
<!-- {: data-highlight="deployment -n staging"} -->

**Restarts every deployment.** It covers the namespace; leave out the name to act on all objects of that resource type. See [kubectl rollout restart](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_rollout/kubectl_rollout_restart/).

### Roll back instead
<!-- {: .-snippet} -->

```bash
kubectl rollout undo deploy/web
```
<!-- {: data-highlight="rollout undo"} -->

**Returns to the previous revision.** A restart creates a new revision, so `undo` reverses it; use `--to-revision` for an older one. See [kubectl rollout undo](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_rollout/kubectl_rollout_undo/).
