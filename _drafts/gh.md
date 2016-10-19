---
title: node-gh
category: JavaScript libraries
---

## Everywhere

| Flag | Description |
| ---- | ---- |
| `-u rstacruz -r nprogress` | Repo name |
| `--browser` | Browser |
{:.no-head}

## Notifications

```
gh nt
gh nt --watch
```

## Issues

| Command | Description |
| ---- | ---- |
| `gh is 'Issue name'` | Create issue |
| `gh is --search 'foo'` | Search issues |
| `gh is 'Name' 'Description'` | Create issue |
| `gh is 123` | Modify issue `123` (use with flags below) |
| ... `-L`/`--label x,y,z` | Add label |
| ... `-A`/`--assignee` | Assign to user |
| ... `-c`/`--comment 'Thanks'` | Add a comment
{:.no-head}
