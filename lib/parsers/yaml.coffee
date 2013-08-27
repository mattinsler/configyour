fs = require 'fs'

module.exports = (config_file) ->
  yaml = require 'yaml'
  
  try
    content = fs.readFileSync(config_file).toString()
    yaml.eval(content)
  catch err
    throw new Error('Error parsing config file ' + config_file + ': ' + err.message)
