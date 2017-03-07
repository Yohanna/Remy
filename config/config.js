'use strict';

module.exports = {
  API_KEY: process.env.GOOGLE_MAPS_API_KEY || '', // Add your API Key here. DO NOT commit the key, keep it private!
  PRODUCTION: process.env.REMY_PROD || false,
  PROD_HOST: '138.197.133.17:10010', // Production host address and port number
  DB_USER: process.env.DB_USER || '',
  DB_PW: process.env.DB_PW || '',
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: process.env.DB_PORT || '3306',
  MORGAN_LOG: true
};