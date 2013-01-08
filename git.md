title: Git
--

## Submodules

    # Import .gitmodules
      git submodule init

    # Clone missing submodules, and checkout commits
      git submodule update --init --recursive

    # Update remote URLs in .gitmodules
    # (Use when you changed remotes in submodules)
      git submodule sync
