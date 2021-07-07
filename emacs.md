---
title: Emacs
category: CLI, GUI
updated: 2020-01-18
---

## Modifier keys

  - `M` is Meta key with is ALT in windows or Linux, Option Key in Mac OS
  - `C` is Control key
  - `S` is shift key
  - `s` is Super key i.e., Command key (⌘) in Mac, Window Key (❖) in
    Windows or Linux
  - `H` is Hyper key. This key can be configured if you fancy it. please
    checkout - <http://ergoemacs.org/emacs/emacs_hyper_super_keys.html>

## movement
{: .-prime}

| keys                      | Movements                                                                                      |
| ------------------------- | ---------------------------------------------------------------------------------------------- |
| C-a                       | Move to beginning of line.                                                                     |
| M-m                       | Move to first non-whitespace character on the line.                                            |
| C-e                       | Move to end of line.                                                                           |
| C-f                       | Move forward one character.                                                                    |
| C-b                       | Move backward one character.                                                                   |
| M-f                       | Move forward one word (I use this a lot).                                                      |
| M-b                       | Move backward one word (I use this a lot, too).                                                |
| C-s                       | Regex search for text in current buffer and move to it. Press C-s again to move to next match. |
| C-r                       | Same as C-s, but search in reverse.                                                            |
| M-\<                      | Move to beginning of buffer.                                                                   |
| M-\>                      | Move to end of buffer.                                                                         |
| M-g g                     | Go to line.                                                                                    |
| C-n (n for Next)          | Moving to the next line                                                                        |
| C-p (p for Previous)      | Moving to the previous line                                                                    |
| C-f (f for Forward)       | Moving one character forward                                                                   |
| C-b (b for Backward)      | Moving one character backward                                                                  |
| M-f (f for Forward)       | Moving one word forward                                                                        |
| M-b (b for Backward)      | Moving one word backward                                                                       |
| C-a                       | Moving to the start of a line                                                                  |
| C-e (e for End)           | Moving to the end of a line                                                                    |
| M-a                       | Moving to the start of a sentence                                                              |
| M-e (e for End)           | Moving to the end of a sentence                                                                |
| C-v (or PgDn)             | Moving one page down                                                                           |
| M-v (or PgUp)             | Moving one page up                                                                             |
| M-\< (Alt + Shift + "\<") | Moving to the beginning of the file                                                            |
| M-\> (Alt + Shift + "\>") | Moving to the end of the file                                                                  |
| C-u C-SPC                 | go to previous cursor position of the same buffer                                              |
| C-x C-SPC                 | go to previous cursor position between buffers                                                 |
{: .-shortcuts}

## Mark

| keys  | description |
| ----- | ----------- |
| C-SPC | set mark    |
{: .-shortcuts}

## Copy/Paste

| Keys                      | Description                                                |
| ------------------------- | ---------------------------------------------------------- |
| C-w                       | Kill region.                                               |
| M-w                       | Copy region to kill ring.                                  |
| C-y                       | Yank.                                                      |
| M-y                       | Cycle through kill ring after yanking.                     |
| M-d                       | Kill word.                                                 |
| C-k                       | Kill line.                                                 |
| C-u o w \[In dired mode\] | \[In dired-mode\] To copy the file name at point with path |
| w \[In dired mode\]       | \[In dired mode\] to copy file name at point               |
{: .-shortcuts}

## Delete Text

| Keys        | Description            |
| ----------- | ---------------------- |
| C-d         | Delete a character     |
| M-d         | Delete a word forward  |
| M-BackSpace | Delete a word backward |
|             |                        |
{: .-shortcuts}

## Case Conversion Commands

| keys    | Description                                           |
| ------- | ----------------------------------------------------- |
| M-l     | Convert following word to lower case (downcase-word). |
| M-u     | Convert following word to upper case (upcase-word).   |
| M-c     | Capitalize the following word (capitalize-word).      |
| C-x C-l | Convert region to lower case (downcase-region).       |
| C-x C-u | Convert region to upper case (upcase-region).         |
{: .-shortcuts}

## Window Operation

| Keys  | Description                                  |
| ----- | -------------------------------------------- |
| C-x 2 | split-window-below (vertically)              |
| C-x 3 | split-window-right (horizontally)            |
| C-x 0 | delete-window (this one)                     |
| C-x 1 | delete-other-windows                         |
| C-x o | other-window (moves foxus to the next window |
{: .-shortcuts}

## Search Repalce

| Keys | Description             |
| ---- | ----------------------- |
| C-s  | Start a forward search. |
| C-r  | Start a reverse search. |
| M-%  | Query-replace           |
{: .-shortcuts}

## Undo / Redo

| Keys  | Description |
| ----- | ----------- |
| C-x u | Undo        |
| C-/   | Undo        |
| C-S-/ | Redo        |
{: .-shortcuts}

## Clojure

| Keys        | Description                                                                       |
| ----------- | --------------------------------------------------------------------------------- |
| C-c M-n     | Switch to namespace of current buffer.                                            |
| C-x C-e     | Evaluate expression immediately preceding point.                                  |
| C-c C-k     | Compile current buffer.                                                           |
| C-c C-d C-d | Display documentation for symbol under point.                                     |
| M-. and M-, | Navigate to source code for symbol under point and return to your original buffer |
| C-c C-d C-a | Apropros search; find arbitrary text across function names and documentation.     |
{: .-shortcuts}

## Cider REPL

| Keys         | Des                             |
| ------------ | ------------------------------- |
| C-up, C-down | Cycle through REPL history.     |
| C-enter      | Close parentheses and evaluate. |
{: .-shortcuts}

## ParEdit-Mode

| Keys             | Description                                                             |
| ---------------- | ----------------------------------------------------------------------- |
| C-right          | Slurp; move closing parenthesis to the right to include nextexpression. |
| C-left           | Barf; move closing parenthesis to the left to exclude lastexpression.   |
| C-M-f            | Move forward to the opening/closing parenthesis.                                |
| C-M-b            | Move backward to the opening/closing parenthesis.                                |
| M-(              | Surround expression after point in parentheses(paredit-wrap-round).     |
| M-x paredit-mode | Toggle paredit mode                                                     |
{: .-shortcuts}

## counsel-find-file

| keys     | Desc                               |
| -------- | ---------------------------------- |
| //       | when on remote, cd to remote root. |
| / C-j    | select local root.                 |
| \~       | when on remote, cd to remote home. |
| / C-j \~ | when on remote, cd to local home.  |
| M-o c    | copy file                          |
| M-o d    | dired                              |
{: .-shortcuts}

## Org-Mode

| Keys           | Desc                           |
| -------------- | ------------------------------ |
| S-\<right\>    | mark as TODO or DONE           |
| C-c C-c        | Tag the bulltes                |
| M-x org-agenda | filter through tags and todo's |
{: .-shortcuts}

## Magit Cheatsheet

You might also be interested in the [Magit Reference
Card](https://magit.vc/manual/magit-refcard.pdf) (pdf).

### Section commands

These commands are for navigation and to change the visibility of
sections.

| Key                        | Description                                                       |
| -------------------------- | ----------------------------------------------------------------- |
| `TAB`                      | toggle body of current section                                    |
| `C-<tab>`                  | cycle visibility of current section and its children              |
| `M-<tab>`                  | cycle visibility of all diff sections                             |
| `s-<tab>`                  | cycle visibility of all sections                                  |
| `1`, `2`, `3`, `4`         | show surrounding sections up to level N, hide deeper levels       |
| `M-1`, `M-2`, `M-3`, `M-4` | globally show sections up to level N, hide deeper levels          |
| `^`                        | goto parent section                                               |
| `p`                        | goto beginning of section, from there to previous section         |
| `n`                        | goto next section                                                 |
| `M-p`                      | goto beginning of section, from there to previous sibling section |
| `M-n`                      | goto next sibling section                                         |
{: .-shortcuts}

### Buffer commands

| Key     | Description                                                                     |
| ------- | ------------------------------------------------------------------------------- |
| `g`     | refresh current buffer and status buffer, possibly revert file-visiting buffers |
| `G`     | refresh all Magit buffers and revert all file-visiting buffers in repository    |
| `q`     | bury the current Magit buffer, restoring previous window configuration          |
| `C-u q` | kill the current Magit buffer, restoring previous window configuration          |
{: .-shortcuts}

### Various common commands

| Key   | Description                                   |
| ----- | --------------------------------------------- |
| `SPC` | scroll up (1)                                 |
| `DEL` | scroll down (1)                               |
| `RET` | show the thing at point in another buffer (2) |
| `j`   | jump somewhere (3)                            |
| `$`   | show output of recent calls to git            |
{: .-shortcuts}

  - (1) In most Magit buffers this scrolls the current buffer. In log
    buffers this instead scrolls the diff buffer shown in another
    window.
  - (2) What is being shown depends on the context.
  - (3) Where this jumps to depends on the context.

### Various assorted commands

| Key     | Description                   |
| ------- | ----------------------------- |
| `i`     | add a gitignore rule globally |
| `I`     | add a gitignore rule locally  |
| `x`     | reset using `--mixed`         |
| `C-u x` | reset using `--hard`          |
{: .-shortcuts}

### Prefix commands

You can use these when you're in the `magit-status` buffer. The list
below can also be accessed by pressing `h`, so there's no need to
memorize this wiki page. Commands will open popup buffers listing infix
arguments and suffix commands.

| Key      | Description          |
| -------- | -------------------- |
| `A`      | cherry-pick          |
| `b`      | branch               |
| `B`      | bisect               |
| `c`      | commit               |
| `d`      | diff                 |
| `E`      | ediff                |
| `f`      | fetch                |
| `F`      | pull                 |
| `h`, `?` | show popup of popups |
| `l`      | log                  |
| `m`      | merge                |
| `M`      | remote               |
| `o`      | submodule            |
| `P`      | push                 |
| `r`      | rebase               |
| `t`      | tag                  |
| `T`      | note                 |
| `V`      | revert               |
| `w`      | apply patches        |
| `C-u y`  | list refs (1)        |
| `z`      | stash                |
| `!`      | run git or gui tool  |
{: .-shortcuts}

  - (1) Actually `y` is bound to a popup/prefix command, but it is one
    of the few popups which default to a suffix command and therefore
    has to be called with a prefix argument to actually show the popup
    buffer.

### Applying changes

| Key | Description                    |
| --- | ------------------------------ |
| `a` | apply the change at point      |
| `k` | discard the change at point    |
| `s` | stage the change at point      |
| `S` | stage all unstaged changes     |
| `u` | unstage the change at point    |
| `U` | unstage all staged changes (1) |
| `v` | reverse the change at point    |
{: .-shortcuts}

  - (1) Actually this asks for a commit to reset the index too. If you
    just press `RET`, then what this equivalent to unstaging everything.
    If that is too confusing then just bind this key to
    `magit-unstage-all`.

### Diffing

These commands show diffs or manipulate the diff arguments used to
generate the diffs in the current buffer.

| Key   | Description                                   |
| ----- | --------------------------------------------- |
| `RET` | (on commit) show commit                       |
| `RET` | (on stash) show stash                         |
| `d`   | show diffing popup                            |
| `D`   | show popup for changing diff arguments        |
| `e`   | use ediff to stage, compare, or stage (dwim)  |
| `E`   | show ediffing popup (for when dwimming fails) |
| `+`   | show more context lines                       |
| `-`   | show less context lines                       |
| `0`   | show default amount of context lines (three)  |
{: .-shortcuts}

### Rebasing

The following commands can be used from the `magit-rebase-popup` which
is activated using `r`

| Key | Description                                                   |
| --- | ------------------------------------------------------------- |
| `i` | Start an interactive rebase sequence.                         |
| `f` | Combine squash and fixup commits with their intended targets. |
| `m` | Edit a single older commit using rebase.                      |
| `w` | Reword a single older commit using rebase.                    |
| `k` | Remove a single older commit using rebase.                    |
{: .-shortcuts}

Whilst performing a rebase the following editing sequences are
available.

| Key       | Description                                                                                                                                                                                                  |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `C-c C-c` | Finish the current editing session by returning with exit code 0. Git then uses the rebase instructions it finds in the file.                                                                                |
| `C-c C-k` | Cancel the current editing session by returning with exit code 1. Git then forgoes starting the rebase sequence.                                                                                             |
| `RET`     | Show the commit on the current line in another buffer and select that buffer.                                                                                                                                |
| `SPC`     | Show the commit on the current line in another buffer without selecting that buffer. If the revision buffer is already visible in another window of the current frame, then instead scroll that window up.   |
| `DEL`     | Show the commit on the current line in another buffer without selecting that buffer. If the revision buffer is already visible in another window of the current frame, then instead scroll that window down. |
| `p`       | Move to previous line.                                                                                                                                                                                       |
| `n`       | Move to next line.                                                                                                                                                                                           |
| `M-p`     | Move the current commit (or command) up.                                                                                                                                                                     |
| `M-n`     | Move the current commit (or command) down.                                                                                                                                                                   |
| `r`       | Edit message of commit on current line.                                                                                                                                                                      |
| `e`       | Stop at the commit on the current line.                                                                                                                                                                      |
| `s`       | Meld commit on current line into previous commit, and edit message.                                                                                                                                          |
| `f`       | Meld commit on current line into previous commit, discarding the current commit’s message.                                                                                                                   |
| `k`       | Kill the current action line.                                                                                                                                                                                |
| `c`       | Use commit on current line.                                                                                                                                                                                  |
| `x`       | Insert a shell command to be run after the proceeding commit.                                                                                                                                                |
| `y`       | Read an arbitrary commit and insert it below current line.                                                                                                                                                   |
| `C-x u`   | Undo some previous changes. Like undo but works in read-only buffers.                                                                                                                                        |
{: .-shortcuts}

If a rebase is already in progress then `magit-rebase-popup` offers the
following commands.

| Key | Description                                                        |
| --- | ------------------------------------------------------------------ |
| `r` | Restart the current rebasing operation.                            |
| `s` | Skip the current commit and restart the current rebase operation.  |
| `e` | Edit the todo list of the current rebase operation.                |
| `a` | Abort the current rebase operation, restoring the original branch. |
{: .-shortcuts}
