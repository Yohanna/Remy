'use strict';
const db = require('../../db/db');

function getUser(req, res) {
  const userID = req.swagger.params.id.value;

  db.getUser(userID)
    .then(function (result) {
      res.send(result);
    })
    .catch(function (reason) {
      // res.send(reason);
      res.status(404).send(reason);
    });
}

function getUserMetrics(req, res) {
  res.send('Metrics');
}

function getAllUsers(req, res) {
  db.getAllUsers()
    .then(function (result) {
      res.send(result);
    })
    .catch(function (reason) {
      // res.send(reason);
      res.status(404).send(reason);
    });
}

function addUser(req, res) {
  const newUser = req.swagger.params.user.value;

  db.addUser(newUser)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((reason) => {
      res.send(reason);
    });
}

function updateUser(req, res) {
  const userID = req.swagger.params.id.value;
  const newUser = req.swagger.params.user.value;

  db.updateUser(userID, newUser)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((reason) => {
      res.send(reason);
    });
}

function deleteUser(req, res) {
  const userID = req.swagger.params.id.value;

  db.deleteUser(userID)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((reason) => {
      res.send(reason);
    });
}

module.exports = {
  getUser: getUser,
  getAllUsers: getAllUsers,
  getUserMetrics: getUserMetrics,
  addUser: addUser,
  updateUser: updateUser,
  deleteUser: deleteUser
};