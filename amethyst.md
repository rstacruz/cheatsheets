---
title: Amethyst
layout: 2017/sheet
tags: [WindowManager, Tiling]
updated: 2022-08-17
intro: |
    [Amethyst](https://ianyh.com/amethyst/) is a tiling window manager for macOS along the lines of xmonad.
---

# Installation
See the official [website](https://ianyh.com/amethyst/) for installation instructions.

# Keyboard Shortcuts

Amethyst uses two modifier combinations.

| Default Shortcut | Description |
| --- | --- |
| `mod1` | `option + shift` |
| `mod2` | `ctrl + option + shift` |

And defines the following commands, mostly a mapping to xmonad key combinations.

| Default Shortcut | Description |
| --- | --- |
| `mod1 + space` | Cycle layout forward |
| `mod2 + space` | Cycle layout backwards |
| `mod1 + h` | Shrink the main pane |
| `mod1 + l` | Expand the main pane |
| `mod1 + ,` | Increase main pane count |
| `mod1 + .` | Decrease main pane count |
| `mod1 + j` | Move focus counter clockwise |
| `mod1 + k` | Move focus clockwise |
| `mod1 + p` | Move focus to counter clockwise screen |
| `mod1 + n` | Move focus to clockwise screen |
| `mod2 + h` | Swap focused window to counter clockwise screen |
| `mod2 + l` | Swap focused window to clockwise screen |
| `mod2 + j` | Swap focused window counter clockwise |
| `mod2 + k` | Swap focused window clockwise |
| `mod1 + enter` | Swap focused window with main window |
| `mod1 + z` | Force windows to be reevalulated |
| `mod2 + z` | Relaunch Amethyst |
| `mod2 + left` | Throw focused window to space left |
| `mod2 + right` | Throw focused window to space right |
| `mod2 + 1` | Throw focused window to space 1 |
| `mod2 + 2` | Throw focused window to space 2 |
| `mod2 + 3` | Throw focused window to space 3 |
| `mod2 + 4` | Throw focused window to space 4 |
| `mod2 + 5` | Throw focused window to space 5 |
| `mod2 + 6` | Throw focused window to space 6 |
| `mod2 + 7` | Throw focused window to space 7 |
| `mod2 + 8` | Throw focused window to space 8 |
| `mod2 + 9` | Throw focused window to space 9 |
| `mod2 + 0` | Throw focused window to space 10 |
| `mod1 + w` | Focus Screen 1 |
| `mod2 + w` | Throw focused window to screen 1 |
| `mod1 + e` | Focus Screen 2 |
| `mod2 + e` | Throw focused window to screen 2 |
| `mod1 + r` | Focus Screen 3 |
| `mod2 + r` | Throw focused window to screen 3 |
| `mod1 + q` | Focus Screen 4 |
| `mod2 + q` | Throw focused window to screen 4 |
| `mod1 + t` | Toggle float for focused window |
| `mod1 + i` | Display current layout |
| `mod2 + t` | Toggle global tiling |
| `mod1 + a` | Select tall layout |
| `none` | Select tall-right layout |
| `mod1 + s` | Select wide layout |
| `none` | Select middle-wide layout |
| `mod1 + d` | Select fullscreen layout |
| `mod1 + f` | Select column layout |
| `none` | Select row layout |
| `none` | Select floating layout |
| `none` | Select widescreen-tall layout |
| `none` | Select bsp layout |

# Available Layouts

Amethyst allows you to cycle among several different window layouts. Layouts can also be enabled/disabled to control whether they appear in the cycle sequence at all.

## Tall

The default layout. This gives you one "main pane" on the left, and one other pane on the right. By default, one window is placed in the main pane (extending the full height of the screen), and all remaining windows are placed in the other pane. If either pane has more than one window, that pane will be evenly split into rows, to show them all. You can use the keyboard shortcuts above to control which window(s), and how many, are in the main pane, as well as the horizontal size of the main pane vs. the other pane.

## Tall-Right

Exactly the same as _Tall_, but the main pane is on the right, with the other pane on the left.

## Wide

The rotated version of _Tall_, where the main pane is on the _top_ (extending the full width of the screen), and the other pane is on the bottom. If either pane has more than one window, that pane will split into columns instead of rows.

## 3Column-Left

A three-column version of _Tall_, with one main pane on the left (extending the full height of the screen) and two other panes, one in the middle and one on the right. Like _Tall_, if any pane has more than one window, that pane will be split into rows. You can control how many windows are in the main pane as usual; other windows will be assigned as evenly as possible between the other two panes.

## 3Column-Middle

Exactly like _3Column-Left_, but the main pane is in the middle, with the other panes on either side. (In previous versions of Amethyst, this layout was known as _Middle-Wide_.)

## 3Column-Right

Exactly like _3Column-Left_, but the main pane is on the right, with the other panes in the middle and on the left.

## Widescreen-Tall

This mode is like _Tall_, but if there are multiple windows in the main pane, the main pane splits into columns rather than rows. The other pane still splits windows into rows, like _Tall_. This layout gets its name because it probably makes the most sense on very wide screens, with a large main pane consisting of several columns, and all remaining windows stacked into the final column. Other layouts that work well on very wide screens include any that allow for more than two columns (to take advantage of the screen width), such as any of the _3Column-\*_ layouts, or _Column_.

## Fullscreen

In this layout, the currently focused window takes up the entire screen, and the other windows are not visible at all. You can rotate between each of the windows using the "focus the next window" shortcut, as usual.

## Column

This layout has one column per window, with each window extending the full height of the screen. The farthest-left window is considered the "main" window in the sense that you can change its size with the "shrink/expand the main pane" shortcuts; the other windows split the remaining space evenly.

## Row

The rotated version of _Column_, where each window takes up an entire row, extending the full width of the screen.

## Floating

This mode makes all windows "floating", allowing you to move and resize them as if Amethyst were temporarily deactivated. Unlike the other modes, this will mean that windows can be placed "on top of" each other, obscuring your view of some windows.

## Binary Space Partitioning (BSP)

This layout does not have a main pane in the way that other layouts do. When adding windows, any given pane can be split evenly into two panes along whatever axis is longer. This is recursive such that pane A can be split in the middle into pane A on the left and pane B on the right; pane B can then be split into pane B on top and pane C on bottom; pane C can then be split into pane C on the left and pane D on the right; and so on.