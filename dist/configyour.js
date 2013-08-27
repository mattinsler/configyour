(function() {
  var PARSERS, apply_config_from_dir, fs, path,
    __slice = [].slice;

  fs = require('fs');

  path = require('path');

  PARSERS = {
    '.json': require('./parsers/json'),
    '.yml': require('./parsers/yaml'),
    '.yaml': require('./parsers/yaml')
  };

  apply_config_from_dir = function(config, dir) {
    var parser_extensions;
    if (!fs.existsSync(dir)) {
      return config;
    }
    parser_extensions = Object.keys(PARSERS);
    fs.readdirSync(dir).forEach(function(file) {
      var config_file, extension, parser;
      extension = path.extname(file);
      parser = PARSERS[extension];
      if (parser == null) {
        return;
      }
      config_file = path.join(dir, file);
      return config[file.slice(0, -extension.length)] = parser(config_file);
    });
    return config;
  };

  module.exports = function(root_dir) {
    var env;
    env = process.env.NODE_ENV || 'development';
    return module.exports.from_directories(root_dir, path.join(root_dir, env));
  };

  module.exports.from_directories = function() {
    var config, d, dirs, _i, _len;
    dirs = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    config = {};
    for (_i = 0, _len = dirs.length; _i < _len; _i++) {
      d = dirs[_i];
      config = apply_config_from_dir(config, d);
    }
    return config;
  };

}).call(this);
