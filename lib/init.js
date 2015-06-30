'use strict';

var inquirer = require('inquirer');
var generateControllerConfig = require('./generate-controller-config');
var envVars = [];

module.exports = function (targetPath, options, pkg) {
  var generate = function () {
    var vars = envVars.map(function (item) {
      var split = item.split('=');

      return {
        key: split[0].trim(),
        value: split[1].trim()
      };
    });

    generateControllerConfig(targetPath, {
      controllerName: options.projectId + '-' + pkg.name,
      replicas: options.replicas,
      containerName: pkg.name,
      containerTag: options.containerTag,
      envVars: JSON.stringify(vars, undefined, 2),
      ports: {
        default: options.containerPort || 3000,
        ssl: options.containerSSLPort || 3443
      }
    }, function (err, result) {
      console.log('done');
    });
  };

  if (options.addEnvVars) {
    askForVars(generate);
  }
};

function askForVars(cb) {
  inquirer.prompt([{
    name: 'envVar',
    message: 'Enter an Env Variable, e.g. PORT=3000',
    validate: function (value) {
      if (!value) {
        return true;
      }

      var split = value.split('=');

      if (split.length === 2) {
        return true;
      }
    }
  }, {
    name: 'askAgain',
    message: 'Would you like to add another?',
    type: 'confirm',
    default: true
  }], function (answers) {
    envVars.push(answers.envVar);

    if (answers.askAgain) {
      askForVars(cb);
    } else {
      cb(envVars);
    }
  });
}
