Description
===========

- This ansible playbook creates a sharded mongodb 3.2 cluster on ubuntu
- The cluster consists of
    - 2 routers
    - 2 config servers (should be 1 or 3, this will change later)
    - 2 replicasets (each having 3 machines)

Requirements
===========
```
sudo apt-get install virtualbox
$ wget https://dl.bintray.com/mitchellh/vagrant/vagrant_1.7.2_x86_64.deb
$ sudo dpkg -i vagrant_1.7.2_x86_64.deb
```

Run
===

vagrant up