'use strict';
const db = require('../../db/db');


function getUserMetrics(req, res) {
  res.send('Metrics');
}

function addUserMetrics(req, res) {
  res.send('addUserMetrics');
}

function updateUserMetrics(req, res) {
  res.send('updateUserMetrics');
}


module.exports = {
  getUserMetrics: getUserMetrics,
  addUserMetrics: addUserMetrics,
  updateUserMetrics: updateUserMetrics
};