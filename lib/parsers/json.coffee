vm = require 'vm'
fs = require 'fs'

module.exports = (config_file) ->
  sandbox = {process: process}

  try
    content = fs.readFileSync(config_file).toString()
    vm.runInNewContext("this.config = #{content};", sandbox, config_file)
    sandbox.config
  catch err
    throw new Error('Error parsing config file ' + config_file + ': ' + err.message)
