fs = require 'fs'
path = require 'path'

PARSERS =
  '.json': require './parsers/json'
  '.yml': require './parsers/yaml'
  '.yaml': require './parsers/yaml'

apply_config_from_dir = (config, dir) ->
  return config unless fs.existsSync(dir)
  
  parser_extensions = Object.keys(PARSERS)
  
  fs.readdirSync(dir).forEach (file) ->
    extension = path.extname(file)
    parser = PARSERS[extension]
    return unless parser?
    
    config_file = path.join(dir, file)
    config[file.slice(0, -extension.length)] = parser(config_file)
  
  config

module.exports = (root_dir) ->
  env = process.env.NODE_ENV or 'development'
  module.exports.from_directories(root_dir, path.join(root_dir, env))

module.exports.from_directories = (dirs...) ->
  config = {}
  config = apply_config_from_dir(config, d) for d in dirs
  config
