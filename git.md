---
title: Git tricks
layout: default
---

## Refs

    HEAD^       # 1 commit before head
    HEAD^^      # 2 commits before head
    HEAD~5      # 5 commits before head

## Branches

    # create a new branch
      git checkout -b $branchname
      git push origin $branchname --set-upstream

    # get a remote branch
      git fetch origin
      git checkout --track origin/$branchname

    # delete local remote-tracking branches (lol)
      git remote prune origin

    # list merged branches
      git branch -a --merged

    # delete remote branch
      git push origin :$branchname

## Submodules

    # Import .gitmodules
      git submodule init

    # Clone missing submodules, and checkout commits
      git submodule update --init --recursive

    # Update remote URLs in .gitmodules
    # (Use when you changed remotes in submodules)
      git submodule sync

## Cherry pick

    git rebase 76acada^

## Misc

    # get current sha1 (?)
      git show-ref HEAD -s

    # show single commit info
      git log -1 f5a960b5

## Short log

     $ git shortlog
     $ git shortlog HEAD~20..    # last 20 commits

     James Dean (1):
         Commit here
         Commit there

     Frank Sinatra (5):
         Another commit
         This other commit
