---
title: How to copy files to and from a Kubernetes pod
link_title: Kubernetes copy files
subtitle: Move files with kubectl cp
logo: { src: /assets/logos/kubernetes.svg }
category: Containers
layout: snippet
last_verified_with: "kubectl 1.37.2, Kubernetes 1.32."
created_at: 2026-11-27
updated: 2026-11-28
links:
  - title: kubectl cp
    url: https://kubernetes.io/docs/reference/kubectl/generated/kubectl_cp/
---

## Copying files
<!-- {: .-snippets} -->

### Copy from a pod
<!-- {: .-snippet} -->

```bash
kubectl cp web-0:/app/log.txt ./log.txt
```
<!-- {: data-highlight="kubectl cp"} -->

**Copies a file out.** The remote side needs the `pod:path` form; the local path is a normal file or directory. See [kubectl cp](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_cp/).

### Copy into a pod
<!-- {: .-snippet} -->

```bash
kubectl cp ./config.yaml web-0:/app/config.yaml
```
<!-- {: data-highlight="./config.yaml web-0:"} -->

**Copies files into a pod.** A local file lands in the container; the parent directory must already exist, and the target's permissions come from the copied file. See [kubectl cp](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_cp/).

### Copy a directory
<!-- {: .-snippet} -->

```bash
kubectl cp web-0:/var/log/nginx ./nginx-logs
```
<!-- {: data-highlight="./nginx-logs"} -->

**Copies a directory tree.** Add `-c` to pick a container when the pod runs more than one. See [kubectl cp](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_cp/).

### Manual tar pipe
<!-- {: .-snippet} -->

```bash
kubectl exec web-0 -- tar cf - /app/log.txt \
  | tar xf - -C ./logs
```
<!-- {: data-highlight="tar cf -"} -->

**Pipes files through tar.** It is done by hand: `kubectl cp` wraps both ends in `tar` and skips symlinks with a warning; this pipeline keeps them and shows tar's errors. See [kubectl exec](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_exec/).
