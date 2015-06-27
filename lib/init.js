'use strict';

var generateControllerConfig = require('./generate-controller-config');

module.exports = function (targetPath, options, pkg) {
  generateControllerConfig(targetPath, {
    controllerName: options.projectId + '-' + pkg.name,
    replicas: options.replicas,
    containerName: pkg.name,
    containerTag: options.containerTag,
    ports: {
      default: options.containerPort || 3000,
      ssl: options.containerSSLPort || 3443
    }
  }, function (err, result) {
    console.log('done');
  });
};

