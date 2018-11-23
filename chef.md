---
title: Chef
category: Devops
layout: 2017/sheet
---

### Install

In your server:
{: .-setup}

```bash
$ sudo apt-get install curl
```

```bash
$ curl -L https://www.opscode.com/chef/install.sh | bash
Thank you for installing Chef!
```

```bash
$ chef-solo -v
...
Chef: 11.4.0
```

### Start the cookbook

```bash
 wget http://github.com/opscode/chef-repo/tarball/master -O - | tar xzf - --strip-components=1
```

### Knife

```bash
$ knife cookbook site download mysql
```

### Invoking chef-solo

```bash
$ chef-solo -c solo.rb -j web.json
```

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

### remote file

```ruby
remote_file "/usr/local/src/hi.tar.gz" do
  source "http://..."
  checksum "ab83be..."
  mode 0644
  action :create_if_missing
end
```

### ruby_block

```ruby
ruby_block "name" do
  block { File.read ... }
  not_if { File.exists?(...) }
end
```

### Execute

```ruby
execute "name" do
  cwd "..."
  environment({ "PATH" => "..." })
  command "make install"
  creates "..."
end
```

### Conditions

```ruby
  creates "/usr/local/src/node-v#{version}/node"
  not_if { File.exists?('...') }
```

## Also see

* [Getting started with Chef](http://gettingstartedwithchef.com/) _(gettingstartedwithchef.com)_
* [install_from_source.rb recipe](https://github.com/mdxp/nodejs-cookbook/blob/master/recipes/install_from_source.rb) _(github.com)_
