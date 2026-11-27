---
title: Vagrantfile
subtitle: Vagrant configuration file
logo: { src: /assets/logos/vagrant.svg }
category: Devops
intro: |
  A Vagrantfile defines boxes, networking, providers, and provisioning for Vagrant development environments.
links:
  - title: Vagrantfile documentation
    url: https://developer.hashicorp.com/vagrant/docs/vagrantfile
  - title: Boxes documentation
    url: https://developer.hashicorp.com/vagrant/docs/boxes
  - title: Synced folders
    url: https://developer.hashicorp.com/vagrant/docs/synced-folders/basic_usage
tier: t3
last_verified_with: "Vagrant 2.4.9."
updated: 2026-11-26
---

## Vagrantfile

### Box

```rb
Vagrant.configure("2") do |config|
  # All Vagrant configuration is done here. The most common
  # configuration options are documented and commented below.
  # For a complete reference, please see the online documentation
  # at vagrantup.com.

  # Every Vagrant virtual environment requires a box to build off of.
  config.vm.box = "precise64"

  # The url from where the 'config.vm.box' box will be fetched if it
  # doesn't already exist on the user's system.
  # config.vm.box_url = "http://domain.com/path/to/above.box"
end
```
<!-- {: data-highlight="config.vm.box"} -->

See: [Vagrantfile](https://developer.hashicorp.com/vagrant/docs/vagrantfile), [boxes](https://developer.hashicorp.com/vagrant/docs/boxes)

### Networking

```rb
Vagrant.configure("2") do |config|
  # Create a forwarded port mapping which allows access to a specific
  # port within the machine from a port on the host machine. In the
  # example below, accessing "localhost:8080" will access port 80 on
  # the guest machine.
  # config.vm.network :forwarded_port, guest: 80, host: 8080

  # Create a private network, which allows host-only access to the
  # machine using a specific IP.
  # config.vm.network :private_network, ip: "192.168.33.10"

  # Create a public network, which generally matched to bridged
  # network. Bridged networks make the machine appear as another
  # physical device on your network.
  # config.vm.network :public_network
end
```
<!-- {: data-highlight="config.vm.network"} -->

See: [Forwarded ports](https://developer.hashicorp.com/vagrant/docs/networking/forwarded_ports), [Private networks](https://developer.hashicorp.com/vagrant/docs/networking/private_network), [Public networks](https://developer.hashicorp.com/vagrant/docs/networking/public_network)

### SSH and synced folders

```rb
Vagrant.configure("2") do |config|
  # If true, then any SSH connections made will enable agent
  # forwarding. Default value: false
  # config.ssh.forward_agent = true

  # Share an additional folder to the guest VM. The first argument is
  # the path on the host to the actual folder. The second argument is
  # the path on the guest to mount the folder. And the optional third
  # argument is a set of non-required options.
  # config.vm.synced_folder "../data", "/vagrant_data"
end
```
<!-- {: data-highlight="config.ssh.forward_agent; config.vm.synced_folder"} -->

See: [SSH settings](https://developer.hashicorp.com/vagrant/docs/vagrantfile/ssh_settings), [Synced folders](https://developer.hashicorp.com/vagrant/docs/synced-folders/basic_usage)

### Providers

```rb
Vagrant.configure("2") do |config|
  # Provider-specific configuration so you can fine-tune various
  # backing providers for Vagrant. These expose provider-specific
  # options. Example for VirtualBox:
  #
  # config.vm.provider :virtualbox do |vb|
  #   # Don't boot with headless mode
  #   vb.gui = true
  #
  #   # Use VBoxManage to customize the VM. For example to change
  #   # memory:
  #   vb.customize ["modifyvm", :id, "--memory", "1024"]
  # end
  #
  # View the documentation for the provider you're using for more
  # information on available options.
end
```
<!-- {: data-highlight="config.vm.provider"} -->

See: [Provider configuration](https://developer.hashicorp.com/vagrant/docs/providers/configuration)

### Puppet provisioning

```rb
Vagrant.configure("2") do |config|
  # Enable provisioning with Puppet stand alone.  Puppet manifests
  # are contained in a directory path relative to this Vagrantfile.
  # You will need to create the manifests directory and a manifest in
  # the file precise64.pp in the manifests_path directory.
  #
  # An example Puppet manifest to provision the message of the day:
  #
  # # group { "puppet":
  # #   ensure => "present",
  # # }
  # #
  # # File { owner => 0, group => 0, mode => 0644 }
  # #
  # # file { '/etc/motd':
  # #   content => "Welcome to your Vagrant-built virtual machine!
  # #               Managed by Puppet.\n"
  # # }
  #
  # config.vm.provision :puppet do |puppet|
  #   puppet.manifests_path = "manifests"
  #   puppet.manifest_file  = "init.pp"
  # end
end
```
<!-- {: data-highlight="config.vm.provision :puppet"} -->

See: [Puppet apply](https://developer.hashicorp.com/vagrant/docs/provisioning/puppet_apply)

### Chef solo

```rb
Vagrant.configure("2") do |config|
  # Enable provisioning with chef solo, specifying a cookbooks path,
  # roles path, and data_bags path (all relative to this Vagrantfile),
  # and adding some recipes and/or roles.
  #
  # config.vm.provision :chef_solo do |chef|
  #   chef.cookbooks_path = "../my-recipes/cookbooks"
  #   chef.roles_path = "../my-recipes/roles"
  #   chef.data_bags_path = "../my-recipes/data_bags"
  #   chef.add_recipe "mysql"
  #   chef.add_role "web"
  #
  #   # You may also specify custom JSON attributes:
  #   chef.json = { :mysql_password => "foo" }
  # end
end
```
<!-- {: data-highlight="config.vm.provision :chef_solo"} -->

See: [Chef Solo](https://developer.hashicorp.com/vagrant/docs/provisioning/chef_solo)

### Chef server

```rb
Vagrant.configure("2") do |config|
  # Enable provisioning with chef server, specifying the chef server
  # URL, and the path to the validation key (relative to this
  # Vagrantfile).
  #
  # The Opscode Platform uses HTTPS. Substitute your organization for
  # ORGNAME in the URL and validation key.
  #
  # If you have your own Chef Server, use the appropriate URL, which
  # may be HTTP instead of HTTPS depending on your configuration.
  # Also change the validation key to validation.pem.
  #
  # config.vm.provision :chef_client do |chef|
  #   chef.chef_server_url =
  #     "https://api.opscode.com/organizations/ORGNAME"
  #   chef.validation_key_path = "ORGNAME-validator.pem"
  # end
  #
  # If you're using the Opscode platform, your validator client is
  # ORGNAME-validator, replacing ORGNAME with your organization name.
  #
  # If you have your own Chef Server, the default validation client
  # name is chef-validator, unless you changed the configuration.
  #
  #   chef.validation_client_name = "ORGNAME-validator"
end
```
<!-- {: data-highlight="config.vm.provision :chef_client"} -->

See: [Chef Client](https://developer.hashicorp.com/vagrant/docs/provisioning/chef_client)

## Also see

* [Vagrant cheatsheet](./vagrant)
