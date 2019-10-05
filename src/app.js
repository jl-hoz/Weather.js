import request from 'request';
import yargs from 'yargs';
import {localization} from './utils';

// LOCALIZATION COMMAND
yargs.command({
  command: 'localization',
  describe: 'get localization data',
  builder: {
    name: {
      describe: 'Name of the place',
      demandOption: true,
      type: 'array',
    },
    index: {
      describe: 'Index of places that has been found',
      demandOption: false,
      type: 'number',
    },
  },
  handler: (argv) => {
    localization(argv);
  },
});

// Llamada al parse ejecuta la función localization
yargs.parse();