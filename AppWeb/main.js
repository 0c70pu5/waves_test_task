function run ({NODE_ENV, ...tail}) {
  switch (NODE_ENV) {
    case 'production':
    case 'development': {
      const webApp = require('./web-app')({NODE_ENV, ...tail});

      webApp.listen(webApp.get('port'), () => {
        console.log(`Web server listening on port ${webApp.get('port')}`);
      });

      return;
    }
    default: {
      throw new Error(`Unknown NODE_ENV value ${NODE_ENV}`);
    }
  }
}

module.exports = {
  run
};
