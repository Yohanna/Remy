'use strict';

module.exports = {
  API_KEY: process.env.GOOGLE_MAPS_API_KEY || '', // Add your API Key here. DO NOT commit the key, keep it private!
  PRODUCTION: process.env.REMY_PROD || false,
  PROD_HOST: '138.197.133.17:10010', // Production host address and port number
  PROD_DB: process.env.PROD_DB || false,
  MORGAN_LOG: true
};