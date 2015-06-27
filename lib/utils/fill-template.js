'use strict';

var fs = require('fs');
var path = require('path');
var Handlebars = require('handlebars');
var templatesPath = path.join(__dirname, '..', 'templates');

module.exports = function fillTemplate(name, data) {
  var templatePath = path.join(templatesPath, name + '.hbs');
  var template = fs.readFileSync(templatePath, { encoding: 'utf8' });
  var stencil = Handlebars.compile(template);

  return stencil(data);
};
