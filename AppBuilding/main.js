function run ({NODE_ENV, ...tail}) {
  switch (NODE_ENV) {
    case 'development': {
      const buildingApp = require('./building-app')({NODE_ENV, ...tail});

      buildingApp.listen(buildingApp.get('port'), () => {
        console.log(`Building server listening on port ${buildingApp.get('port')}`);
      });

      return;
    }
    case 'production': {
      throw new Error('Not use building server in production!');
    }
    default: {
      throw new Error(`Unknown NODE_ENV value ${NODE_ENV}`);
    }
  }
}

module.exports = {
  run
};
