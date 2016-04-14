var config = require('./protractor-shared.conf.js').config;

config.multiCapabilities = [
  { browserName: 'chrome' }
];

exports.config = config;
