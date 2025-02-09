---
title: YUM
category: CLI
updated: 2024-02-07
---

## Commands

### Help and lists

```bash
yum help                     # Display yum commands and options
yum list available           # List all available packages
yum list installed           # List all installed packages
yum list kernel              # List installed and available kernel packages
yum info vsftpd              # List info about vsftpd package
```

### Searching and dependencies

```bash
yum deplist nfs-utils        # List dependencies for nfs-utils
yum provides "*bin/top"      # Show package containing top command
yum search samba             # Find packages with samba in name or description
```

### Updating and security

```bash
yum updateinfo security      # Get info on available security updates
yum update --security        # Apply security-related package updates
```

### Managing repositories

```bash
yum repolist                     # Display enabled software repositories
yum repoinfo rhel-7-server-rpms  # See info on specific repo
yum repo-pkgs my-rpms list       # List packages from a specific repo
```

### Installation and upgrades

```bash
yum install vsftpd           # Install the vsftpd package
yum update                   # Update all packages
yum downgrade abc            # Downgrade the abc package to an earlier version
yum autoremove httpd         # Remove httpd and unneeded packages
```

### Package groups

```bash
yum groupinstall "Web server"    # Install Web Server packages
```

### Troubleshooting

```bash
yum history list             # List all yum transactions
yum clean packages           # Delete packages saved in cache
```

### Popular options

```bash
-y                           # Assume yes if prompted
--disablerepo=epel           # Disable a specific repo for a command
--downloadonly               # Download package to cache but don't install
```
