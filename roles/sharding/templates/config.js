/*
* sh.addShard will fail if host already there so we're safe
* One host in replicaset is enough but we here try to add all any way
* sh.status() print string and doesn not suit server side scripting
* in this case u could use on mongos :
* use config
* db.shards.find({}) to list all shards
*
* shard key should be of high cardinality
* sh.shardCollection("<database>.<collection>", shard-key-pattern) , shardCollection create idex on field if collection is empty otherwise u need to create it your self before sharding it
* sh.shardCollection("records.people", { "zipcode": 1, "name": 1 } )
* sh.shardCollection("people.addresses", { "state": 1, "_id": 1 } )
* sh.shardCollection("assets.chairs", { "type": 1, "_id": 1 } )
* sh.shardCollection("events.alerts", { "_id": "hashed" } )
*/

{% for host in groups['replicasets']%}

sh.addShard("{{hostvars[host]['replicaset_name']}}/{{host}}:27017")

{% endfor %}

sh.enableSharding("{{database_name}}")
{% for collection in sharded_collections %}
    sh.shardCollection("{{database_name}}.{{collection}}", { {% for attribute in sharded_collections[collection] %} "{{attribute}}":"{{sharded_collections[collection][attribute]}}" {% if not loop.last %},{% endif %} {% endfor %} } )
{% endfor %}