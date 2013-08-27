(function() {
  var fs;

  fs = require('fs');

  module.exports = function(config_file) {
    var content, yaml;
    yaml = require('yaml');
    try {
      content = fs.readFileSync(config_file).toString();
      return yaml["eval"](content);
    } catch (err) {
      throw new Error('Error parsing config file ' + config_file + ': ' + err.message);
    }
  };

}).call(this);
