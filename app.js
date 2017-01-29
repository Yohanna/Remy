'use strict';

const SwaggerExpress = require('swagger-express-mw');
const app = require('express')();
const SwaggerUi = require('swagger-tools/middleware/swagger-ui');
const helmet = require('helmet');
const config = require('./config/config');
const logger = require('./helpers/logger');

app.use(helmet());

module.exports = app; // for testing

const swaggerConfig = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(swaggerConfig, function (err, swaggerExpress) {
  if (err) { throw err; }

  if (config.PRODUCTION) {
    logger.info('Running in Production');
    swaggerExpress.runner.swagger.host = config.PROD_HOST;
  }

  // Use Swagger-UI, at /docs path
  app.use(SwaggerUi(swaggerExpress.runner.swagger));

  // install middleware
  swaggerExpress.register(app);

  logger.info(`Running on host: ${swaggerExpress.runner.swagger.host}`);

  const port = process.env.PORT || 10010;
  app.listen(port);

  if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log(`try this:\ncurl http://127.0.0.1:${port}/hello?name=Scott`);
  }
}); 
