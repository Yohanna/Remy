const winston = require('winston');

/**
 * Available levers: Info, Warn, Error
 */

const logger = module.exports = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      colorize: 'all'
    })
  ]
});

module.exports = logger;