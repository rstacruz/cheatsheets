---
title: How to decode a Kubernetes secret
link_title: Kubernetes decode secret
subtitle: Read base64 secret values
category: Containers
layout: snippet
last_verified_with: "kubectl 1.37.2, Kubernetes 1.32."
updated: 2026-11-27
links:
  - title: kubectl get
    url: https://kubernetes.io/docs/reference/kubectl/generated/kubectl_get/
  - title: Secrets
    url: https://kubernetes.io/docs/concepts/configuration/secret/
---

## Reading values
<!-- {: .-snippets} -->

### One key
<!-- {: .-snippet} -->

```bash
kubectl get secret db \
  -o jsonpath='{.data.password}' | base64 -d
```
<!-- {: data-highlight="-o jsonpath"} -->

**Prints a single decoded value.** Secrets store every value base64-encoded, which is encoding rather than encryption, so `base64 -d` turns it back into text. See [Secrets](https://kubernetes.io/docs/concepts/configuration/secret/).

### Every key
<!-- {: .-snippet} -->

```bash
kubectl get secret db -o json \
  | jq -r '.data | map_values(@base64d)'
```
<!-- {: data-highlight="map_values(@base64d)"} -->

**Decodes the whole secret at once.** `jq`'s `@base64d` handles each value, which saves looking up keys one by one. See [jq manual](https://jqlang.github.io/jq/manual/).

### List the keys
<!-- {: .-snippet} -->

```bash
kubectl get secret db -o json | jq '.data | keys'
```
<!-- {: data-highlight="keys"} -->

**Shows which keys the secret holds.** The keys are readable without decoding because only the values are base64. See [kubectl get](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_get/).

### Decode in a template
<!-- {: .-snippet} -->

```bash
kubectl get secret db \
  --template='{{.data.password|base64decode}}'
```
<!-- {: data-highlight="base64decode"} -->

**Decodes with kubectl alone, without `jq` or `base64`.** Go templates run inside kubectl, which helps on minimal machines and CI images. See [kubectl get](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_get/).
