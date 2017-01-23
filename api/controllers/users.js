'use strict';
// const sqlite3 = require('sqlite3');
const db = require('../../db/db');



function getUser(req, res) {

  const user_id = req.swagger.params.id.value;

  db.getUser(user_id)
    .then(function (result) {
      console.log(result);
      res.send(result);
    })
    .catch(function (reason) {
      console.log(reason);
      res.send(reason);
    });
}

function addUser(req, res) {
  res.send('add user');
  console.log(req.swagger.params.User.value);
}

function updateUser(req, res) {
  res.send('update user');
}

function deleteUser(req, res) {
  res.send('delete user');
}

module.exports = {
  getUser: getUser,
  addUser: addUser,
  updateUser: updateUser,
  deleteUser: deleteUser
};