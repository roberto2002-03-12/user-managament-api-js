const express = require('express');
const routerApi = require('./routes/index');
const {
  ormErrorHandler, errorHandler, logErrors, boomErrorHandler,
} = require('./middlewares/error.handler');

const createApp = () => {
  const app = express();

  app.use(express.json());

  // eslint-disable-next-line global-require
  require('./utils/auth/index');

  routerApi(app);

  app.use(logErrors);
  app.use(ormErrorHandler);
  app.use(boomErrorHandler);
  app.use(errorHandler);

  return app;
};

module.exports = createApp;
