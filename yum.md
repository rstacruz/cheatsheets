---
title: YUM
category: CLI
layout: 2017/sheet
updated: 2024-02-07
---

## Queries

### Help and Lists

```bash
yum help                     # Display yum commands and options
yum list available           # List all available packages
yum list installed           # List all installed packages
yum list kernel              # List installed and available kernel packages
yum info vsftpd              # List info about vsftpd package
```

### Searching and Dependencies

```bash
yum deplist nfs-utils        # List dependencies for nfs-utils
yum provides "*bin/top"      # Show package containing top command
yum search samba             # Find packages with samba in name or description
```

### Updating and Security

```bash
yum updateinfo security      # Get info on available security updates
yum update --security        # Apply security-related package updates
```

## Managing Repositories

```bash
yum repolist                 # Display enabled software repositories
yum repoinfo rhel-7-server-rpms  # See info on specific repo
yum repo-pkgs my-rpms list       # List packages from a specific repo
```

## Installation and Upgrades

```bash
yum install vsftpd           # Install the vsftpd package
yum update                   # Update all packages
yum downgrade abc            # Downgrade the abc package to an earlier version
yum autoremove httpd         # Remove httpd and unneeded packages
```

## Package Groups

```bash
yum groupinstall "Web server"    # Install Web Server packages
```

## Troubleshooting

```bash
yum history list             # List all yum transactions
yum clean packages           # Delete packages saved in cache
```

## Popular Options

```bash
-y                           # Assume yes if prompted
--disablerepo=epel           # Disable a specific repo for a command
--downloadonly               # Download package to cache but don't install
```