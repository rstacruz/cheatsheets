---
title: Git extras
category: Git
---

### Git-flow

    $ git feature myfeature
      switched to branch 'feature/rofl'

    $ ...
    $ git checkout develop
    $ git feature finish myfeature
      merging 'feature/rofl' into develop
      deleted branch 'feature/rofl'

Also `git-bug` and `git-refactor`.

### Branches

    $ git delete-merged-branches
      # hint: do `git remote prune origin` after

    $ git checkout -b development     # create and switch to development branch
    $ git checkout development        # switch do development branch
    $ git branch -D development       # delete with force a local branch
    $ git branch -d development       # delete a branch
    $ git branch -m development new_name # rename a branch      

    $ git fresh-branch gh-pages

### Inspecting

    $ glgp='git log --stat -p' 
    $ gloga='git log --oneline --decorate --graph --all'
    $ glo='git log --oneline --decorate'
    $ glods='git log --graph --pretty='\''%Cred%h%Creset -%C(auto)%d%Creset %s %Cgreen(%ad) %│
C(bold blue)<%an>%Creset'\'' --date=short'  

    glgp, gloga, glo, glods are alias in zshrc git-extras plugin

### Github

    $ git fork strongloop/express
    # sync your fork with the original repository:
    $ git remote add upstream https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY.git
    $ git fetch upstream; git merge upstream/master


### Tags

    $ git release v1.0.0           # commit, tag, push-tags
    $ git delete-tag v1.0.0

### Conveniences

    $ git ignore "*.log"

### Locking

Assumes that changes will not be committed.

    $ git lock config/database.yml
    $ git unlock config/database.yml

### Etc

    $ git obliterate secret.yml   # remove all references to it

### References

 * https://github.com/visionmedia/git-extras
