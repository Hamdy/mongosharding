function getConfig(){
    return {
       _id: "{{replicaset_name}}",
       "version" : 1,
       members: [
          {% for group in group_names %}
            {% if 'replicaset' in group and 'replicasets' not in group %}
                {% for host in groups[group] %}
                    { "_id": {{loop.index}} , "host": "{{ hostvars[host]['ansible_' + iface]['ipv4']['address']}}:27017" {% if hostvars[host]['arbiter'] is defined %}, arbiterOnly:true {% endif %}}{% if not loop.last %},{% endif %}
                {% endfor %}
            {% endif %}
          {% endfor %}
       ]
    }
}

if(rs.status()['ok']){
    if(rs.isMaster()['ismaster']){
        rs.reconfig(getConfig())
    }
}else{
    rs.initiate(getConfig())
}