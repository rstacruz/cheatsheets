---
title: How to switch the Kubernetes namespace
link_title: Kubernetes switch namespace
subtitle: Namespaces per command or default
logo: { src: /assets/logos/kubernetes.svg }
category: Containers
layout: snippet
last_verified_with: "kubectl 1.37.2, Kubernetes 1.32."
updated: 2026-11-27
links:
  - title: Namespaces
    url: https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/
  - title: kubectl config set-context
    url: https://kubernetes.io/docs/reference/kubectl/generated/kubectl_config/kubectl_config_set-context/
---

## Choosing a namespace
<!-- {: .-snippets} -->

### For one command
<!-- {: .-snippet} -->

```bash
kubectl get pods -n staging
```
<!-- {: data-highlight="-n staging"} -->

**Runs a single command in another namespace.** Nothing changes on disk, so the next command goes back to the current default. See [Namespaces](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/).

### For every command
<!-- {: .-snippet} -->

```bash
kubectl config set-context --current \
  --namespace=staging
```
<!-- {: data-highlight="--current"} -->

**Changes the current context's default namespace.** Every later command uses `staging` until you change it again. See [kubectl config set-context](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_config/kubectl_config_set-context/).

### Check the default
<!-- {: .-snippet} -->

```bash
kubectl config view --minify \
  -o jsonpath='{..namespace}'
```
<!-- {: data-highlight="--minify"} -->

**Prints the namespace in effect.** An empty result means the context falls back to `default`. See [kubectl config view](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_config/kubectl_config_view/).

### List namespaces
<!-- {: .-snippet} -->

```bash
kubectl get namespaces
```
<!-- {: data-highlight="kubectl get namespaces"} -->

**Shows the namespaces you can reach.** Shorten the resource to `ns`; add `-A` to a listing command, such as `kubectl get pods -A`, to search every namespace. See [Namespaces](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/).
