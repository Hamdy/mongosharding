function getConfig(){
    return {
       _id: "{{config_replicaset_name}}",
       configsvr: true,
       members: [
          {% for host in groups['config_servers'] %}
           { "_id": {{loop.index}} , "host": "{{ hostvars[host]['ansible_' + iface]['ipv4']['address']}}:27017"}{% if not loop.last %},{% endif %}
          {% endfor %}

       ]
    }
}

if(rs.status()['ok']){
    rs.reconfig(getConfig())
}else{
    rs.initiate(getConfig())

}