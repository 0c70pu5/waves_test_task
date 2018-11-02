const loForEach = require('lodash/forEach');
const baseEnv = require('../etc/dev');

// set default variables to process.env
loForEach(baseEnv, (value, key) => {
  if (!process.env[key]) {
    process.env[key] = value
  }
});

const webApp = require('../AppWeb');
webApp.run(process.env);
