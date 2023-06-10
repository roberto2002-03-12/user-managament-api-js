const { config } = require('../config/config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `mysql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

module.exports = {
  development: {
    url: URI,
    dialect: 'mysql',
    /*
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false
      }
    }
    */
  },
  production: {
    url: URI,
    dialect: 'mysql',
    /*
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false
      }
    }
    */
  },
};
