---
title: Chef
category: Devops
---

### Install
In your server:

    $ sudo apt-get install curl

    $ curl -L https://www.opscode.com/chef/install.sh | bash
    Thank you for installing Chef!

    $ chef-solo -v
    ...
    Chef: 11.4.0

### Start the cookbook

     wget http://github.com/opscode/chef-repo/tarball/master -O - | tar xzf - --strip-components=1

### Knife

    $ knife cookbook site download mysql

### Invoking chef-solo

    $ chef-solo -c solo.rb -j web.json

### Simple compile-from-source

    execute "tar --no-same-owner -zxf hi.tar.gz" do
      cwd "/usr/local/src"
      creates "/usr/local/src/node-v#{version}"
    end

    bash "compile" do
      cwd "/usr/local/src/node-v#{version}"
      code %[
        PATH=/usr/local/bin:$PATH
        ./configure
        make
      ]
      creates "/usr/local/src/node-v#{version}/node"
    end

### remote file

    remote_file "/usr/local/src/hi.tar.gz" do
      source "http://..."
      checksum "ab83be..."
      mode 0644
      action :create_if_missing
    end

### ruby_block

    ruby_block "name" do
      block { File.read ... }
      not_if { File.exists?(...) }
    end

### Execute

    execute "name" do
      cwd "..."
      environment({ "PATH" => "..." })
      command "make install"
      creates "..."
    end

### Conditions

      creates "/usr/local/src/node-v#{version}/node"
      not_if { File.exists?('...') }

### References

  * http://gettingstartedwithchef.com/
  * https://github.com/mdxp/nodejs-cookbook/blob/master/recipes/install_from_source.rb
