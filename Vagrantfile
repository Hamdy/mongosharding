# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|
	config.vm.box = "ubuntu/trusty64"
	# workaround for https://github.com/mitchellh/vagrant/issues/5048
	config.ssh.insert_key = false

	# General VirtualBox VM configuration.
	config.vm.provider :virtualbox do |v|
		v.customize ["modifyvm", :id, "--memory", 300]
		v.customize ["modifyvm", :id, "--cpus", 1]
		v.customize ["modifyvm", :id, "--natdnshostresolver1", "on"]
		v.customize ["modifyvm", :id, "--ioapic", "on"]
	end

	if Vagrant.has_plugin?("vagrant-cachier")
		config.cache.scope = :machine
	end

    config.vm.define "config1" do |node|
		node.vm.hostname = "config1"
		node.vm.network :private_network, ip: "192.168.90.3"
	end

	config.vm.define "config2" do |node|
		node.vm.hostname = "config2"
		node.vm.network :private_network, ip: "192.168.90.4"
	end

	config.vm.define "router1" do |node|
		node.vm.hostname = "router1"
		node.vm.network :private_network, ip: "192.168.90.5"
	end

	config.vm.define "router2" do |node|
		node.vm.hostname = "router2"
		node.vm.network :private_network, ip: "192.168.90.6"
	end

    config.vm.define "replica11" do |node|
		node.vm.hostname = "replica11"
		node.vm.network :private_network, ip: "192.168.90.7"
	end

	config.vm.define "replica12" do |node|
		node.vm.hostname = "replica12"
		node.vm.network :private_network, ip: "192.168.90.8"
	end

	config.vm.define "replica13" do |node|
		node.vm.hostname = "replica13"
		node.vm.network :private_network, ip: "192.168.90.9"
	end

	config.vm.define "replica2_1" do |node|
		node.vm.hostname = "replica21"
		node.vm.network :private_network, ip: "192.168.90.10"
	end

	config.vm.define "replica22" do |node|
		node.vm.hostname = "replica22"
		node.vm.network :private_network, ip: "192.168.90.11"
	end

	config.vm.define "replica23" do |node|
		node.vm.hostname = "replica23"
		node.vm.network :private_network, ip: "192.168.90.12"
		node.vm.provision "ansible" do |ansible|
			ansible.playbook = "deploy.yml"
            ansible.inventory_path = "hosts"
			ansible.limit = "all"
			ansible.sudo = true
			ansible.extra_vars = {
				ansible_ssh_user: 'vagrant',
				ansible_ssh_private_key_file: "~/.vagrant.d/insecure_private_key"
			}
		end
	end
end