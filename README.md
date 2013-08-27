# configyour

Simple directory and file based configuration using json and yaml

## Installation

```sh
$ npm install configyour
```

## Usage

configyour will read the directory that you pass it and return an object containing the contents of
the `.json`, `.yml`, and `.yaml` files, keyed the by filenames. Then it will go a single level down
the directory chain to a directory named the same as `process.env.NODE_ENV` and override any existing
keys with those found in the envrionment-specific directory.

For example:

```
|- my-app
|- server.js
|- config/
|  |- foo.json
|  |- production/
|  |  |- foo.json
|  |- development/
|  |  |- foo.json
|  |  |- debug.json
```

If your server.js file had the following line in it:

```javascript
var config = require('configyour')(__dirname + '/config');
```

In production, the output would be an object that looked like:

```json
{
  "foo": {
    // content of config/production/foo.json
  }
}
```

In development, the output would be an object that looked like:

```json
{
  "foo": {
    // content of config/development/foo.json
  },
  "debug": {
    // content of config/development/debug.json
  }
}
```

And finally, in test, the output would be an object that looked like:

```json
{
  "foo": {
    // content of config/foo.json
  }
}
```

## License
Copyright (c) 2013 Matt Insler
Licensed under the MIT license.
