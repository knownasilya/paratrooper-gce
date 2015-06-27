'use strict';

var fs = require('fs');
var path = require('path');
var Handlebars = require('handlebars');
var templatesPath = path.join(__dirname, 'templates');

module.exports = function (targetPath, options, pkg) {
  var controllerPath = path.join(targetPath, 'k8s-controller.json');
  var controller = fillTemplate('controller', {
    controllerName: options.projectId + '-' + pkg.name,
    replicas: options.replicas,
    containerName: pkg.name,
    containerTag: options.containerTag,
    ports: {
      default: options.containerPort || 3000,
      ssl: options.containerSSLPort || 3443
    }
  });

  fs.writeFile(controllerPath, controller, function () {
    console.log('done');
  });
};

function fillTemplate(name, data) {
  var templatePath = path.join(templatesPath, name + '.hbs');
  var template = fs.readFileSync(templatePath, { encoding: 'utf8' });
  var stencil = Handlebars.compile(template);

  return stencil(data);
}
