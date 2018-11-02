const loForEach = require('lodash/forEach');
const baseEnv = require('../etc/prod');

// set default variables to process.env
loForEach(baseEnv, (value, key) => {
  if (!process.env[key]) {
    process.env[key] = value
  }
});

const program = require('../AppWeb');
program.run(process.env);

