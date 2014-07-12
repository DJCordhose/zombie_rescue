

var createClusters = function (clusterOptions) {
    window.clusters = [];
    _.each(clusterOptions, createCluster);
};

var createCluster = function (options) {
    clusters.push({zombies: new Zombies(options)})

    //createZombies(cluster);
    //createHome(cluster.position);
};