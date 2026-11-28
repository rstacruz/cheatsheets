---
title: How to run a Bash command in the background
link_title: Background process
subtitle: Run jobs without blocking
logo: { src: /assets/logos/bash.svg }
category: CLI
layout: snippet
last_verified_with: "Bash 5.3.0."
updated: 2026-11-28
tier: t3
links:
  - title: Bash job control
    url: https://www.gnu.org/software/bash/manual/html_node/Job-Control.html
  - title: nohup
    url: https://www.gnu.org/software/coreutils/manual/html_node/nohup-invocation.html
---

## Jobs
<!-- {: .-snippets} -->

### Run in background
<!-- {: .-snippet} -->

```bash
sleep 60 &
```
<!-- {: data-highlight="&"} -->

**Starts the command without waiting.** An interactive shell prints the job number and PID; `$!` holds the PID. See [job control](https://www.gnu.org/software/bash/manual/html_node/Job-Control-Basics.html).

### List jobs
<!-- {: .-snippet} -->

```bash
jobs
```
<!-- {: data-highlight="jobs"} -->

**Lists this shell's jobs.** These are the background jobs; `jobs -l` adds PIDs, and `kill %1` stops job 1. See [jobs](https://www.gnu.org/software/bash/manual/html_node/Job-Control-Builtins.html).

### Resume in foreground
<!-- {: .-snippet} -->

```bash
fg %1
```
<!-- {: data-highlight="fg %1"} -->

**Brings a job forward.** `fg %1` resumes job 1 in the foreground; `Ctrl+Z` suspends the running job first. See [fg](https://www.gnu.org/software/bash/manual/html_node/Job-Control-Builtins.html).

### Resume in background
<!-- {: .-snippet} -->

```bash
bg %1
```
<!-- {: data-highlight="bg %1"} -->

**Resumes a suspended job.** `bg` restarts it in the background; use it after `Ctrl+Z` when the job should keep running. See [bg](https://www.gnu.org/software/bash/manual/html_node/Job-Control-Builtins.html).

### After logout
<!-- {: .-snippet} -->

```bash
nohup ./server.sh &
```
<!-- {: data-highlight="nohup"} -->

**Keeps jobs alive at logout.** The terminal can close without stopping them: `nohup` ignores SIGHUP and appends output to `nohup.out`. See [nohup](https://www.gnu.org/software/coreutils/manual/html_node/nohup-invocation.html).

### Wait for jobs
<!-- {: .-snippet} -->

```bash
sleep 5 &
wait $!
```
<!-- {: data-highlight="wait $!"} -->

**Blocks until the job finishes.** `wait` alone waits for every background job; `$!` targets the last one. See [wait](https://www.gnu.org/software/bash/manual/html_node/Job-Control-Builtins.html).
