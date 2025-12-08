---
title: rclone
category: CLI
---

### Basic configuration

```bash
rclone config       # Start the interactive configuration wizard to add new remotes
rclone config show  # Display the current configuration
rclone listremotes  # List the names of all configured remotes
```

### Listing files & directories

```bash
rclone ls <remote>:<path>    # List files and file sizes
rclone lsl <remote>:<path>   # List files, sizes, and modification times
rclone lsd <remote>:<path>   # List directories only
rclone tree <remote>:<path>  # List contents in a tree-like structure
```

### Copying & syncing

#### Copy

```bash
rclone copy <source> <dest>            # Copy new/changed files
rclone copy <source> <dest> --dry-run  # Test the copy operation without making changes
```

#### Sync

```bash
rclone sync <source> <dest>            # Sync source to destination
rclone sync <source> <dest> --dry-run  # Test the sync operation (recommended before actual sync)
```

### Deleting & moving

```bash
rclone move <source> <dest>    # Move files (copy and then delete the source)
rclone delete <remote>:<path>  # Delete the files in the path
rclone purge <remote>:<path>   # Delete the path and all of its contents (Irrecoverable!)
rclone rmdir <remote>:<path>   # Remove an empty directory
```

### File manipulation

```bash
rclone mkdir <remote>:<path>           # Create a new directory
rclone touch <remote>:<path>/file.txt  # Create a new file with the current time
rclone cat <remote>:<path>/file.txt    # Output the file content to standard output
rclone check <source> <dest>           # Check if the files in source and dest are identical
```

### Important flags (general)

```bash
--dry-run                     # Show what would be transferred without doing it
-P or --progress              # Show progress during transfer
--transfers=N                 # Set number of file transfers to run in parallel (default 4)
--checkers=N                  # Set number of checkers to run in parallel (default 8)
--max-age <time>              # Don't transfer files older than <time>
--min-age <time>              # Don't transfer files newer than <time>
--include <filter>            # Include files matching this pattern
--exclude <filter>            # Exclude files matching this pattern
--fast-list                   # Use recursive listing to speed up checks (may use more memory)
--multi-thread-cutoff <size>  # Use multiple threads for files bigger than <size>
--multi-thread-streams <N>    # Number of streams to use for multi-thread transfers
```