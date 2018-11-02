const http = require('http');
const vm = require('vm');
const concat = require('concat-stream');

function getRemoteModule(url) {
  return new Promise(function (resolve, reject) {
    return http.get(url, function (res) {
      res.setEncoding('utf8');
      res.pipe(concat({encoding: 'string'}, function (remoteSrc) {
        try {
          const __$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null);
          const __$$GLOBAL_REWIRE_NEXT_MODULE_ID__ = 0;

          const sandbox = {
            setTimeout,
            clearTimeout,
            process,
            global,
            __$$GLOBAL_REWIRE_REGISTRY__,
            __$$GLOBAL_REWIRE_NEXT_MODULE_ID__,
            require,
            bundle: {}
          };
          const context = new vm.createContext(sandbox, {
            name: 'VM Client context'
          });
          vm.runInContext(remoteSrc, context, {
            displayErrors: true,
            filename: 'ssr.bundle.vm'
          });
          resolve(sandbox.bundle);
        } catch (e) {
          reject(e);
        }
      }));
    });
  });
}

module.exports = getRemoteModule;
