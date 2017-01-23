const sqlite3 = require('sqlite3');
const path = require('path');

const DB_PATH = path.join(__dirname, 'remy.sqlite');

function initializeDB() {
  return new Promise(function (resolve, reject) {
    const db = new sqlite3.Database(DB_PATH, sqlite3.OPEN_READWRITE, function (err) {
      if (err) reject(err);
      resolve(db);
    });
  });
}


/**
 * @description Gets a user from db
 * @param {number} user_id User ID to get
 */
function getUser(user_id) {
  return new Promise(function (resolve, reject) {
    initializeDB()
      .then(function (db) {
        db.all(`SELECT * FROM users WHERE id = ${user_id}`, function (err, rows) {
          if (err) {
            console.log(`db.all Error: ${err}`);
            reject(err);
          }
          resolve(rows);
        });
      })
      .catch(function (reason) {
        reject(reason);
      });
  });
}
/**
 * @description Adds a new user to the db
 * @param {object} User use to add to the db
 */
function addUser(User) {
  // TODO add a use to the db
}

module.exports = {
  getUser: getUser,
  addUser: addUser
};
