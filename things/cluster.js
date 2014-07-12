var createClusters = function (clusterOptions) {
    window.clusters = [];
    _.each(clusterOptions, createCluster);
};

var createCluster = function (options) {
    clusters.push({home: new Home(options.homePosition), zombies: new Zombies(options)});
};