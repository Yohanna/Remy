'use strict';
const db = require('../../db/db');

function login(req, res) {

  const userInfo = req.swagger.params.LoginInfo.value;

  db.login(userInfo)
    .then((userID) => {
      res.send({ userID: userID });
    })
    .catch((reason) => {
      if (reason === 'Forbidden') { // User doesn't exist
        res.status(403).json({ message: 'Incorrect login info' });
      } else { // Different error
        res.send(reason);
      }
    });
}


module.exports = {
  login: login
};