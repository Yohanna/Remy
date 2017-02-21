'use strict';
// const db = require('../../db/db');
const db = require('../../db/db.mysql');

function getUser(req, res) {
  const userID = req.swagger.params.id.value;

  db.getUser(userID)
    .then(function (result) {
      res.send(result);
    })
    .catch(function (reason) {
      res.status(404).json(reason);
    });
}

function getAllUsers(req, res) {
  db.getAllUsers()
    .then(function (result) {
      res.send(result);
    })
    .catch(function (reason) {
      res.status(500).json({ message: reason });
    });
}

function addUser(req, res) {
  const newUser = req.swagger.params.user.value;

  db.addUser(newUser)
    .then((newUserID) => {
      res.status(201).json({ userID: newUserID });
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
  addUser: addUser,
  updateUser: updateUser,
  deleteUser: deleteUser
};