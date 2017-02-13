const sqlite3 = require('sqlite3');
const path = require('path');
const config = require('../config/config');
const logger = require('../helpers/logger');

const PROD_DB_PATH = path.join(__dirname, 'prod.sqlite');
const STAGING_DB_PATH = path.join(__dirname, 'staging.sqlite');
const DB_USED = config.PROD_DB ? PROD_DB_PATH : STAGING_DB_PATH;

logger.info(`Using DB: ${DB_USED}`);

function initializeDB() {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(DB_USED, sqlite3.OPEN_READWRITE, (err) => {
      if (err) reject(err);
      resolve(db);
    });
  });
}


/**
 * @description Gets a user from db
 * @param {Number} userID User ID to get
 */
function getUser(userID) {
  return new Promise((resolve, reject) => {
    initializeDB()
      .then((db) => {
        db.get(`SELECT * FROM users WHERE id = ${userID}`, (err, row) => {
          if (err) {
            reject(err);
          }
          else if (row === undefined) {
            reject({ message: 'User does not exist' });
          }
          resolve(row);
        });
      })
      .catch((reason) => {
        reject(reason);
      });
  });
}

/**
 *  Gets all the users in the DB 
 * @returns {Promise} A promise containing an array of all users rows
 */
function getAllUsers() {
  return new Promise((resolve, reject) => {
    initializeDB()
      .then((db) => {
        db.all('SELECT * FROM users', (err, rows) => {
          if (err) {
            console.log(`db.all Error: ${err}`);
            reject(err);
          }
          resolve(rows);
        });
      })
      .catch((reason) => {
        reject(reason);
      });
  });
}

/**
 * @description Adds a new user to the db
 * @param {Object} newUser New user to add
 * @returns {Promise} A Promise that resolves to the new User ID created
 */
function addUser(newUser) {
  return new Promise((resolve, reject) => {
    initializeDB()
      .then((db) => {
        db.run(`INSERT INTO users(email,name,password, gender, student)
                VALUES ($email, $name, $pass, $gender, $student)`, {
            $name: newUser.name,
            $email: newUser.email,
            $pass: newUser.password,
            $gender: newUser.gender,
            $student: newUser.student
          }, (err) => {
            if (err) {
              reject(err);
            }
          })
          // Select the same user to return it's ID
          .get('SELECT * FROM users WHERE email = $email', { $email: newUser.email }, (err, row) => {
            if (err) {
              reject(err);
            }
            else {
              resolve(row.id);
            }
          });
      })
      .catch((reason) => {
        reject(reason);
      });
  });
}

/**
 * @description Update a user's information
 * @param {number} userID
 * @param {Object} user
 */
function updateUser(userID, user) {
  return new Promise((resolve, reject) => {
    initializeDB()
      .then((db) => {
        db.run('UPDATE users SET name = $name, email = $email, password = $pass WHERE id = $id', {
          $id: userID,
          $name: user.name,
          $email: user.email,
          $pass: user.password
        }, (err) => {
          if (err) {
            reject(err);
          }
          else {
            resolve();
          }
        });
      })
      .catch((reason) => {
        reject(reason);
      });
  });
}

/**
 * @description Delete a user's
 * @param {number} userID
 */
function deleteUser(userID) {
  return new Promise((resolve, reject) => {
    initializeDB()
      .then((db) => {
        db.run('DELETE FROM users WHERE id = $id', {
          $id: userID
        }, (err) => {
          if (err) {
            reject(err);
          }
          else {
            resolve();
          }
        });
      })
      .catch((reason) => {
        reject(reason);
      });
  });
}

/**
 * @description Checks if a user exists in the DB and returns the user's ID if it does
 * 
 * @param {Object} userInfo
 * @property {string} userInfo.email
 * @property {string} userInfo.password
 */
function login(userInfo) {
  return new Promise((resolve, reject) => {
    initializeDB()
      .then((db) => {
        db.get('SELECT * FROM users WHERE email = $email AND password = $password', {
          $email: userInfo.email,
          $password: userInfo.password
        }, (err, row) => {
          if (err) {
            reject(err);
          } else if (row === undefined) {
            reject({ message: 'Forbidden' });
          }
          else {
            // Return user's ID
            resolve(row.id);
          }
        });
      })
      .catch((reason) => {
        reject(reason);
      });
  });
}


/**
 * 
 * 
 * @param {Number} userID
 * @param {Object} userMetrics
 * @param {integer} userMetrics.prefered_price
 * @param {string} userMetrics.prefered_transportation_method
 * @param {Array} userMetrics.history
 * @param {Array} userMetrics.favorite_restaurants
 * @param {Array} userMetrics.favorite_food
 */
function addUserMetrics(userID, userMetrics) {
  return new Promise((resolve, reject) => {
    initializeDB()
      .then((db) => {
        db.run(`INSERT INTO user_metrics (user_id, prefered_price, prefered_transportation_method,
                history, favorite_restaurants, favorite_food)
                VALUES ($userID, $price, $transMethod, $history, $favRest, $favFood)`, {
            $userID: userID,
            $price: userMetrics.prefered_price,
            $transMethod: userMetrics.prefered_transportation_method,
            $history: JSON.stringify(userMetrics.history),
            $favRest: JSON.stringify(userMetrics.favorite_restaurants),
            $favFood: JSON.stringify(userMetrics.favorite_food)
          }, (err) => {
            if (err) {
              reject(err);
            }
            else {
              resolve();
            }
          });
      })
      .catch((reason) => {
        reject(reason);
      });
  });
}

module.exports = {
  getUser: getUser,
  getAllUsers: getAllUsers,
  addUser: addUser,
  updateUser: updateUser,
  deleteUser: deleteUser,
  login: login,
  addUserMetrics: addUserMetrics
};
