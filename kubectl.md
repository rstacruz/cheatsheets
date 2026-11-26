---
title: kubectl
subtitle: Kubernetes cluster CLI
category: Containers
tier: t2
last_verified_with: "kubectl 1.37.2, Kubernetes 1.32."
updated: 2026-11-27
fragments:
  - "kubectl get pods"
  - "kubectl describe"
  - "kubectl logs -f"
  - "kubectl exec -it"
  - "kubectl apply -f"
  - "kubectl delete"
  - "-o wide"
  - "-o yaml"
  - "-l app=web"
  - "-n namespace"
  - "get-contexts"
  - "use-context"
  - "rollout status"
  - "rollout restart"
  - "port-forward"
  - "top pods"
  - "kubectl debug"
  - "--previous"
keywords:
  - kubectl cheat sheet
  - kubectl get pods
  - kubectl logs
  - kubectl exec
  - kubectl apply
intro: |
  [kubectl](https://kubernetes.io/docs/reference/kubectl/) drives Kubernetes clusters from the terminal. This reference covers inspecting workloads, logs, manifests, rollouts, contexts, and debugging.
links:
  - title: kubectl reference
    url: https://kubernetes.io/docs/reference/kubectl/
  - title: kubectl quick reference
    url: https://kubernetes.io/docs/reference/kubectl/quick-reference/
  - title: Docker CLI cheatsheet
    url: "./docker"
  - title: Docker Compose cheatsheet
    url: "./docker-compose"
---

## Get resources

### `get` - List resources

```bash
kubectl get pods
kubectl get pods -A                # all namespaces
kubectl get pods -n kube-system    # one namespace
kubectl get deploy,svc,pods
kubectl get pods -w                # watch for changes
```
<!-- {: data-highlight="kubectl get pods"} -->

`-A` covers every namespace; `-n` narrows to one. `-w` keeps the table open and updates it as objects change.

See: [kubectl get](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_get/)

### Output formats

```bash
kubectl get pod web -o wide
kubectl get pod web -o yaml
kubectl get pods -o name
kubectl get pods -o jsonpath='{.items[*].metadata.name}'
kubectl get pods \
  -o custom-columns=NAME:.metadata.name,IP:.status.podIP
```
<!-- {: data-highlight="-o wide; -o yaml"} -->

`-o wide` adds node and IP columns. `-o yaml` and `-o json` return the whole object, ready to pipe through `yq` or `jq`.

See: [Output options](https://kubernetes.io/docs/reference/kubectl/#output-options)

### `describe` - Show details

```bash
kubectl describe pod web-0
kubectl describe node worker-1
```
<!-- {: data-highlight="kubectl describe"} -->

Shows status, container state, and recent events, which the `get` table leaves out.

See: [kubectl describe](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_describe/)

### `explain` - Look up a field

```bash
kubectl explain deploy.spec.strategy
kubectl explain deploy.spec.strategy --recursive
```
<!-- {: data-highlight="kubectl explain"} -->

Prints the API reference for a field, including the values it accepts. `--recursive` expands nested fields.

See: [kubectl explain](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_explain/)

## Logs, shell and files
<!-- {: .-three-column} -->

### `logs` - Read pod logs

```bash
kubectl logs web-0
kubectl logs -f web-0
kubectl logs --tail=100 web-0
kubectl logs --previous web-0
kubectl logs -f -l app=web \
  --max-log-requests=10
```
<!-- {: data-highlight="kubectl logs"} -->

`--previous` reads the container instance that crashed before the restart. `-l` reads every pod matching a selector; with `-f`, kubectl follows at most five streams unless `--max-log-requests` raises the cap.

See: [kubectl logs](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_logs/)

### `exec` - Run a command in a pod

```bash
kubectl exec web-0 -- ls /app
kubectl exec -it web-0 -- sh
kubectl exec -it web-0 \
  -c nginx -- bash
```
<!-- {: data-highlight="kubectl exec"} -->

Everything after `--` runs inside the container. `-c` picks one container when the pod runs several.

See: [kubectl exec](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_exec/)

### `port-forward` - Open a local tunnel

```bash
kubectl port-forward pod/web-0 8080:80
kubectl port-forward svc/web 8080:80
kubectl port-forward deploy/web 8080:80
kubectl port-forward svc/web :80
```
<!-- {: data-highlight="kubectl port-forward"} -->

Forwards a pod or service port to localhost for testing. Omitting the local port picks a free one; the tunnel stays open until you interrupt it.

See: [kubectl port-forward](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_port-forward/)

### `cp` - Copy files

```bash
kubectl cp web-0:/app/log.txt ./log.txt
kubectl cp ./config.yaml \
  web-0:/app/config.yaml
```
<!-- {: data-highlight="kubectl cp"} -->

Copies into or out of a container. The container image needs `tar` for `kubectl cp` to work.

See: [kubectl cp](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_cp/)

## Apply and delete
<!-- {: .-three-column} -->

### `apply` - Apply manifests

```bash
kubectl apply -f deployment.yaml
kubectl apply -f ./manifests/
kubectl apply -k ./overlays/prod
```
<!-- {: data-highlight="kubectl apply"} -->

Creates or updates objects to match the files. `-k` reads a kustomization directory instead of a file.

See: [kubectl apply](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_apply/)

### `diff` - Preview changes

```bash
kubectl diff -f deployment.yaml
```
<!-- {: data-highlight="kubectl diff"} -->

Prints a unified diff of the live object against the file, so you can review changes before applying them.

See: [kubectl diff](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_diff/)

### `create` - Generate a manifest

```bash
kubectl create deployment web \
  --image=nginx:1.29 \
  --dry-run=client \
  -o yaml > web.yaml
kubectl create namespace staging \
  --dry-run=client -o yaml
```
<!-- {: data-highlight="--dry-run=client"} -->

`--dry-run=client -o yaml` writes a starter manifest without touching the cluster.

See: [kubectl create](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_create/)

### `edit` - Change a live object

```bash
kubectl edit deploy/web
kubectl edit svc/web
```
<!-- {: data-highlight="kubectl edit"} -->

Opens the live object in your editor and applies it when you save. Handy for a quick image or replica change without a manifest.

See: [kubectl edit](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_edit/)

### `delete` - Delete resources

```bash
kubectl delete pod web-0
kubectl delete -f deployment.yaml
kubectl delete pods -l app=web
kubectl delete namespace staging
```
<!-- {: data-highlight="kubectl delete"} -->

Deleting a pod alone lets its controller start a replacement. Delete the deployment to remove the workload.

See: [kubectl delete](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_delete/)

## Rollouts
<!-- {: .-three-column} -->

### `rollout status` - Wait for a rollout

```bash
kubectl rollout status deploy/web
kubectl rollout status deploy/web \
  --timeout=60s
```
<!-- {: data-highlight="rollout status"} -->

Blocks until the deployment finishes updating. Use `--timeout` in scripts so it cannot hang.

See: [kubectl rollout status](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_rollout/kubectl_rollout_status/)

### `rollout restart` - Restart pods

```bash
kubectl rollout restart deploy/web
```
<!-- {: data-highlight="rollout restart"} -->

Replaces pods gradually, following the deployment's update strategy. No manifest change is needed.

See: [kubectl rollout restart](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_rollout/kubectl_rollout_restart/)

### `set image` - Change the image

```bash
kubectl set image deploy/web \
  nginx=nginx:1.29
```
<!-- {: data-highlight="kubectl set image"} -->

Updates one container's image and triggers a rollout. The name after the deployment is the container name.

See: [kubectl set image](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_set/kubectl_set_image/)

### `rollout undo` - Roll back

```bash
kubectl rollout history deploy/web
kubectl rollout undo deploy/web
kubectl rollout undo deploy/web \
  --to-revision=2
```
<!-- {: data-highlight="rollout undo"} -->

Reverts to the previous revision, or the one named with `--to-revision`.

See: [kubectl rollout undo](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_rollout/kubectl_rollout_undo/)

### `scale` / `autoscale` - Change replicas

```bash
kubectl scale deploy/web --replicas=3
kubectl autoscale deploy/web \
  --min=2 --max=5 --cpu=70%
```
<!-- {: data-highlight="kubectl scale; kubectl autoscale"} -->

`scale` sets the replica count. `autoscale` adds a horizontal pod autoscaler that adjusts it with load.

See: [kubectl scale](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_scale/) and [kubectl autoscale](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_autoscale/)

## Contexts and namespaces
<!-- {: .-three-column} -->

### List contexts

```bash
kubectl config get-contexts
kubectl config current-context
```
<!-- {: data-highlight="config get-contexts; config current-context"} -->

A context bundles a cluster, a user, and a default namespace. The asterisk marks the active one.

See: [kubectl config](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_config/)

### Switch context

```bash
kubectl config use-context staging
kubectl config use-context prod
```
<!-- {: data-highlight="config use-context"} -->

Points later commands at another cluster. Check it with `current-context` before running anything destructive.

See: [kubectl config use-context](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_config/kubectl_config_use-context/)

### Set the default namespace

```bash
kubectl config set-context --current \
  --namespace=staging
kubectl config view --minify \
  -o jsonpath='{..namespace}'
```
<!-- {: data-highlight="--namespace=staging"} -->

Changes the current context, so later commands use `staging` without `-n`.

See: [kubectl config set-context](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_config/kubectl_config_set-context/)

### Per-command namespace

```bash
kubectl get pods -n staging
kubectl get pods --all-namespaces
```
<!-- {: data-highlight="-n staging"} -->

`-n` applies to one command; `--all-namespaces` covers every namespace.

See: [Namespaces](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/)

## Debug
<!-- {: .-three-column} -->

### `events` - Recent events

```bash
kubectl get events \
  --sort-by=.lastTimestamp
kubectl get events -A \
  --field-selector type=Warning
```
<!-- {: data-highlight="kubectl get events"} -->

Events explain why a pod is pending or crash-looping. Sorting by time puts the newest last.

See: [Event reference](https://kubernetes.io/docs/reference/kubernetes-api/cluster-resources/event-v1/)

### `top` - Resource usage

```bash
kubectl top pods
kubectl top nodes
kubectl top pod web-0 --containers
```
<!-- {: data-highlight="kubectl top"} -->

Requires metrics-server; without it the command fails, and a pod that has not been sampled yet has no metrics to show.

See: [kubectl top](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_top/)

### `debug` - Debug a pod or node

```bash
kubectl debug -it web-0 \
  --image=busybox:1.37 \
  --target=nginx
kubectl debug node/worker-1 -it \
  --image=busybox:1.37
kubectl debug web-0 \
  --copy-to=web-debug \
  --image=busybox:1.37
```
<!-- {: data-highlight="kubectl debug"} -->

`--target` adds an ephemeral container beside the app container and shares its process namespace. `--copy-to` starts a modified copy of the pod instead.

See: [kubectl debug](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_debug/)
