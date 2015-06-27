'use strict';

var fs = require('fs');
var path = require('path');
var fillTemplate = require('./utils/fill-template');

module.exports = function (targetPath, data, cb) {
  var controllerPath = path.join(targetPath, 'k8s-controller.json');
  var controller = fillTemplate('controller', data);

  fs.writeFile(controllerPath, controller, function (err, result) {
    cb(err, result);
  });
};
