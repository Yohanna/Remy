'use strict';
import * as db from '../../db/db';


function getUserMetrics(req, res) {
  const userID = req.swagger.params.id.value;

  db.getUserMetrics(userID)
    .then((userMetrics) => {
      res.json(userMetrics);
    })
    .catch((reason) => {
      res.status(404).json({ message: reason });
    });
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
  const newMetrics = req.swagger.params.metrics.value;
  const userID = req.swagger.params.id.value;

  db.updateUserMetrics(userID, newMetrics)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((reason) => {
      res.json({ message: reason });
    })
}


module.exports = {
  getUserMetrics: getUserMetrics,
  addUserMetrics: addUserMetrics,
  updateUserMetrics: updateUserMetrics
};