---
title: Zsh
category: CLI
---

### Stuff

    !!                  Last command (sudo !!)

    !*                 Last command's parameters (vim !*)
    !^                 Last command's first parameter
    !$                 Last command's last parameter

    !?ls<tab>          Command and params of last `ls` command (sudo !?mv<tab>)
    !?ls?:*<tab>       Params of last `ls` command

    *(m0)              Last modified today
    *(m-4)             Last modified <4 days ago

### Change default shell

    chsh -s `which zsh`
