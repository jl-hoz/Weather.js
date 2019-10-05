"use strict";

var _request = _interopRequireDefault(require("request"));

var _yargs = _interopRequireDefault(require("yargs"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// LOCALIZATION COMMAND
_yargs["default"].command({
  command: 'localization',
  describe: 'get localization data',
  builder: {
    name: {
      describe: 'Name of the place',
      demandOption: true,
      type: 'array'
    },
    index: {
      describe: 'Index of places that has been found',
      demandOption: false,
      type: 'number'
    }
  },
  handler: function handler(argv) {
    (0, _utils.localization)(argv);
  }
}); // Llamada al parse ejecuta la función localization


_yargs["default"].parse();