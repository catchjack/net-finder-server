'use strict';

let path = require('path');
let _ = require('lodash');

// Base config
let base = {
  env: process.env.NODE_ENV,
  root: path.normalize(__dirname + '/../../..'),
  port: process.env.PORT || 3000,
  logType : 'dev'
};


// Overide base config with environment
module.exports = _.merge(base, require('./' + process.env.NODE_ENV + '.js') || {});
