---
title: Chef
subtitle: Infrastructure automation platform
category: Devops
last_verified_with: "Chef Infra Client 19.4."
updated: 2026-11-25
tier: t3
---

### Install

In your server:

<!-- {: .-setup} -->

```bash
$ sudo apt-get install curl
```

```bash
$ curl -L https://omnitruck.chef.io/install.sh | sudo bash
Thank you for installing Chef!
```

```bash
$ chef-solo -v
...
Chef: 14.5.33
```

See: [Chef install script](https://docs.chef.io/chef_install_script/)

### Start the cookbook

```bash
 wget http://github.com/chef-cookbooks/chef-repo/tarball/master -O - | tar xzf - --strip-components=1
```

See: [Chef repository](https://docs.chef.io/chef_repo/)

### Knife

```bash
$ knife supermarket download mysql
```

See: [knife](https://docs.chef.io/workstation/knife/)

### Invoking chef-solo

```bash
$ chef-solo -c solo.rb -j web.json
```

See: [chef-solo](https://docs.chef.io/client/19/features/chef_solo/ctl_chef_solo/)

## Examples

### Simple compile-from-source

```ruby
execute "tar --no-same-owner -zxf hi.tar.gz" do
  cwd "/usr/local/src"
  creates "/usr/local/src/node-v#{version}"
end
```

```ruby
bash "compile" do
  cwd "/usr/local/src/node-v#{version}"
  code %[
    PATH=/usr/local/bin:$PATH
    ./configure
    make
  ]
  creates "/usr/local/src/node-v#{version}/node"
end
```

See: [execute resource](https://docs.chef.io/resources/execute/)

### remote file

```ruby
remote_file "/usr/local/src/hi.tar.gz" do
  source "http://..."
  checksum "ab83be..."
  mode 0644
  action :create_if_missing
end
```

See: [remote_file resource](https://docs.chef.io/resources/remote_file/)

### ruby_block

```ruby
ruby_block "name" do
  block { File.read ... }
  not_if { File.exists?(...) }
end
```

See: [ruby_block resource](https://docs.chef.io/resources/ruby_block/)

### Execute

```ruby
execute "name" do
  cwd "..."
  environment({ "PATH" => "..." })
  command "make install"
  creates "..."
end
```

See: [execute resource](https://docs.chef.io/resources/execute/)

### Conditions

```ruby
  creates "/usr/local/src/node-v#{version}/node"
  not_if { File.exists?('...') }
```

See: [Guards](https://docs.chef.io/resources/execute/#guards)

## Also see

* [Learn Chef Rally](https://learn.chef.io) _(learn.chef.io)_
* [install_from_source.rb recipe](https://github.com/mdxp/nodejs-cookbook/blob/master/recipes/install_from_source.rb) _(github.com)_
