---
title: Homebrew
layout: default
---

### Commands

    brew unlink git
    brew link git

    brew list                # List all installed

    brew list --versions git # See what versions of `git` you have
    brew info git            # List versions, caveats, etc
    brew cleanup git         # Remove old versions
    brew edit git            # Edit this formula
    brew home git            # Open homepage

### Tricks
  
```sh
# Show latest casks
cd "/usr/local/Library/Taps/caskroom/homebrew-cask/Casks" && git log --pretty=format: --name-only --since="30 days ago" | egrep "Casks" | uniq
```

Tmux
----

Install a more-recent version that supports tmux -C

    brew install https://github.com/adamv/homebrew-alt/raw/master/other/tmux-iterm2.rb

Install the wrapper for stuff to enable OSX clipboard to work

    brew install reattach-to-user-namespace --wrap-pbcopy-and-pbpaste

Make sure that your VIM alias uses it

    alias vim="reattach-to-user-namespace /Application/MacVim/Contents/MacOS/Vim"
