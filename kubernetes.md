---
title: Kubernetes CLI Cheatsheet
category: Devops
layout: 2017/sheet
updated: 2024-02-15
intro: |
 [Kubernetes](https://kubernetes.io/docs/home/) is an open-source container orchestration system for automating software deployment, scaling, and management. Originally designed by Google, the project is now maintained by the Cloud Native Computing Foundation. But if your only using the CLI I recommend [K9S](https://k9scli.io/).
---

# Kubernetes Cheatsheet

## Cluster Management

### Get Resources
```bash
kubectl get <resource>                # List resources (nodes, pods, svc, deploy, etc.)
kubectl get all                       # List all resources in a namespace
kubectl get all --all-namespaces      # List all resources in all namespaces
kubectl get <resource> -o wide        # Display extended information
```

### Describe Resources
```bash
kubectl describe <resource> <name>    # Describe a resource (node, pod, svc, etc.)
```

### Create and Apply Resources
```bash
kubectl apply -f <file.yaml>          # Apply a configuration to a resource from a file
# or via terminal
kubectl apply -f - <<EOF
apiVersion: v1
kind: Pod
...
EOF
```

### Delete Resources
```bash
kubectl delete <resource> <name>      # Delete a resource by name
kubectl delete -f <file.bash>         # Delete a resource using the configuration file
```

## Workload Management

### Managing Pods
```bash
kubectl run <name> --image=<image>    # Start a single instance of a specified image
kubectl logs <pod_name>               # Fetch logs of a pod
kubectl exec <pod_name> -- <cmd>      # Execute a command in a pod
```

### Managing Deployments
```bash
kubectl set image deployment/<name> <container_name>=<new_image>  # Update image of a deployment
kubectl rollout status deployment/<name>                          # Check the rollout status of a deployment
kubectl rollout undo deployment/<name>                            # Rollback to the previous deployment
```

### ConfigMaps and Secrets
```bash
kubectl create configmap <name> --from-literal=key=value        # Create a new configmap
kubectl create secret generic <name> --from-literal=key=value   # Create a new secret
```

## Debugging and Diagnostics

### Logs and Monitoring
```bash
kubectl logs <pod_name> --tail=100    # Get the last 100 lines of a pod's logs
kubectl top pod <pod_name>            # Display the CPU and memory usage of a pod
```

### Events and Status
```bash
kubectl get events                         # Get events for namespace
kubectl rollout history deployment/<name>  # Check the history of deployments
```

## Node and Storage Management

### Node Operations
```bash
kubectl cordon <node_name>           # Mark node as unschedulable
kubectl drain <node_name>            # Drain node for maintenance
```

### Storage
```bash
kubectl get pv                       # List all Persistent Volumes
kubectl get pvc                      # List all Persistent Volume Claims
```