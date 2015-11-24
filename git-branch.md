---
title: Git branches
category: Git
---

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

    # get current sha1 (?)
      git show-ref HEAD -s
