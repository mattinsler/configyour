(function() {
  var fs, vm;

  vm = require('vm');

  fs = require('fs');

  module.exports = function(config_file) {
    var content, sandbox;
    sandbox = {
      process: process
    };
    try {
      content = fs.readFileSync(config_file).toString();
      vm.runInNewContext("this.config = " + content + ";", sandbox, config_file);
      return sandbox.config;
    } catch (err) {
      throw new Error('Error parsing config file ' + config_file + ': ' + err.message);
    }
  };

}).call(this);
