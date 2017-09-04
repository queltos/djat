# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

unless Vagrant.has_plugin?("vagrant-notify-forwarder")
  # Used to forward filesystem events to Vagrant for yarn
  raise 'Missing Plugin! Use `vagrant plugin install vagrant-notify-forwarder` on host to install'
end

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.provision "ansible_local" do |ansible|
    ansible.playbook = "ansible/vagrant.yml"
  end

  config.vm.box = "centos/7"

  config.vm.network "forwarded_port", guest: 8000, host: 8000
  config.vm.network "forwarded_port", guest: 3000, host: 3000
  config.vm.synced_folder ".", "/vagrant", type: "virtualbox"

  config.vm.provider "virtualbox" do |vb|
    vb.customize ["modifyvm", :id, "--pae", "on"]
  end
end
