'use strict';
const db = require('../../db/db');


function getUserMetrics(req, res) {
  res.send('Metrics');
}

function addUserMetrics(req, res) {
  const newUserMetrics = req.swagger.params.metrics.value;
  const userID = req.swagger.params.id.value;

  db.addUserMetrics(userID, newUserMetrics)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((reason) => {
      res.json({ message: reason });
    });
}

function updateUserMetrics(req, res) {
  res.send('updateUserMetrics');
}


module.exports = {
  getUserMetrics: getUserMetrics,
  addUserMetrics: addUserMetrics,
  updateUserMetrics: updateUserMetrics
};