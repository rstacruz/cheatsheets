---
title: How to shell into a Kubernetes pod
link_title: Kubernetes exec shell
subtitle: Run commands inside a pod
category: Containers
layout: snippet
last_verified_with: "kubectl 1.37.2, Kubernetes 1.32."
updated: 2026-11-27
links:
  - title: kubectl exec
    url: https://kubernetes.io/docs/reference/kubectl/generated/kubectl_exec/
---

## Running commands
<!-- {: .-snippets} -->

### Open a shell
<!-- {: .-snippet} -->

```bash
kubectl exec -it web-0 -- sh
```
<!-- {: data-highlight="kubectl exec -it"} -->

**Starts an interactive shell in the pod.** `-i` keeps stdin open and `-t` allocates a terminal; both are needed for a prompt. See [kubectl exec](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_exec/).

### Run one command
<!-- {: .-snippet} -->

```bash
kubectl exec web-0 -- ls /app
```
<!-- {: data-highlight="-- ls /app"} -->

**Runs a single command and returns its output.** Drop `-it` for scripts; everything after `--` goes to the container. See [kubectl exec](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_exec/).

### Choose a container
<!-- {: .-snippet} -->

```bash
kubectl exec -it web-0 -c api -- bash
```
<!-- {: data-highlight="-c api"} -->

**Targets one container in a multi-container pod.** Without `-c`, kubectl uses the pod's first container. See [kubectl exec](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_exec/).

### Another namespace
<!-- {: .-snippet} -->

```bash
kubectl exec -n staging -it web-0 -- sh
```
<!-- {: data-highlight="-n staging"} -->

**Runs the command in a pod outside the current namespace.** The pod name only needs to be unique within that namespace. See [kubectl exec](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_exec/).
