title: Brew
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

### Stuff

Nice Homebrew packages:

 * `tig` - Git "GUI" for the console
 * `mysql`
 * `postgresql`
 * `fmdiff` - Adaptor to use Apple's FileMerge as `diff` (`git config --global merge-tool fmdiff`)
 * `cmus` - Curses-based music player
 * `cclive` - Video downloader

 Not from brew:

* `DiffMerge` - nice free merge tool for OSX

Tmux
----

Install a more-recent version that supports tmux -C

    brew install https://github.com/adamv/homebrew-alt/raw/master/other/tmux-iterm2.rb

Install the wrapper for stuff to enable OSX clipboard to work

    brew install reattach-to-user-namespace --wrap-pbcopy-and-pbpaste

Make sure that your VIM alias uses it

    alias vim="reattach-to-user-namespace /Application/MacVim/Contents/MacOS/Vim"
