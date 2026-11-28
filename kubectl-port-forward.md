---
title: How to port-forward a Kubernetes service
link_title: Kubernetes port-forward
subtitle: Tunnel pod ports to localhost
logo: { src: /assets/logos/kubernetes.svg }
category: Containers
layout: snippet
last_verified_with: "kubectl 1.37.2, Kubernetes 1.32."
updated: 2026-11-28
links:
  - title: kubectl port-forward
    url: https://kubernetes.io/docs/reference/kubectl/generated/kubectl_port-forward/
---

## Forwarding ports
<!-- {: .-snippets} -->

### Forward a service
<!-- {: .-snippet} -->

```bash
kubectl port-forward svc/web 8080:80
```
<!-- {: data-highlight="kubectl port-forward"} -->

**Maps a port locally.** It forwards a service port to localhost, prints the local address, and keeps running until you press Ctrl+C. See [kubectl port-forward](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_port-forward/).

### Forward a pod or deployment
<!-- {: .-snippet} -->

```bash
kubectl port-forward deploy/web 8080:80
```
<!-- {: data-highlight="deploy/web"} -->

**Targets a workload.** Use a workload instead of a service; kubectl picks a running pod for a deployment, or use `pod/web-0` for a named pod. See [kubectl port-forward](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_port-forward/).

### Pick a local port
<!-- {: .-snippet} -->

```bash
kubectl port-forward svc/web :80
```
<!-- {: data-highlight=":80"} -->

**Picks a free local port.** The OS chooses the port and kubectl prints it, avoiding clashes with services already running on your machine. See [kubectl port-forward](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_port-forward/).

### Another namespace
<!-- {: .-snippet} -->

```bash
kubectl port-forward -n staging svc/web 8080:80
```
<!-- {: data-highlight="-n staging"} -->

**Forwards across namespaces.** It forwards a service in another namespace; like other commands, `-n` selects the namespace for this call only. See [kubectl port-forward](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_port-forward/).
