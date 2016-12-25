'use strict';

const SwaggerExpress = require('swagger-express-mw');
const app = require('express')();
const SwaggerUi = require('swagger-tools/middleware/swagger-ui');
const helmet = require('helmet');

app.use(helmet());

module.exports = app; // for testing

const config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // Use Swagger-UI, at /docs path
  app.use(SwaggerUi(swaggerExpress.runner.swagger));

  // install middleware
  swaggerExpress.register(app);

  const port = process.env.PORT || 10010;
  app.listen(port);

  if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log(`try this:\ncurl http://127.0.0.1:${port}/hello?name=Scott`);
  }
}); 
