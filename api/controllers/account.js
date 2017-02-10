'use strict';
const db = require('../../db/db');

function login(req, res) {
  res.status(200).send('login');
}


module.exports = {
  login: login
};