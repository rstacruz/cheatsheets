Locations of startup items
--------------------------

    /System/Library/LaunchAgents/
    /System/Library/LaunchDaemons/
    /Library/LaunchAgents/
    /Library/LaunchDaemons/

Hide desktop icons
------------------

    defaults write com.apple.finder CreateDesktop -bool false
    killall Finder

Auto-hide other windows on dock switch
--------------------------------------

    defaults write com.apple.dock single-app -bool TRUE
    killall Dock

    defaults delete com.apple.dock single-app
    killall Dock

