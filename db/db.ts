'use strict';

const mysql = require('mysql');
import * as config from '../config/config';
import * as logger from '../helpers/logger';
import { Metrics, RecentSearch, UserAction, UserResult } from './db.d';

logger.info(`Using DB: ${config.DB_HOST}`);

const db = mysql.createConnection({
  host: config.DB_HOST,
  user: config.DB_USER,
  password: config.DB_PW,
  database: 'remy'
});

db.connect((err) => {
  if (err) { throw err; }
});


/**
 * @description Gets a user from db
 * @param {number} userID User ID to get
 */
function getUser(userID) {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM users WHERE id=?', [userID], (err, result) => {
      if (err) { return reject(err); }
      else if (result.length === 0) {
        reject('User does not exist');
      } else {
        resolve(result[0]);
      }
    });
  });
}

/**
 *  Gets all the users in the DB 
 * @returns {Promise} A promise containing an array of all users rows
 */
function getAllUsers() {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM users', (err, rows) => {
      if (err) { return reject(err); }
      resolve(rows);
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
    db.query(`INSERT INTO users(email,name,password, gender, student)
                VALUES (?, ?, ?, ?, ?)`,
      [newUser.name,
      newUser.email,
      newUser.password,
      newUser.gender,
      newUser.student], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.insertId);
        }
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
    db.query('UPDATE users SET name=?, email=?, password=? WHERE id=?', [
      user.name,
      user.email,
      user.password,
      userID
    ], (err, result) => {
      if (err) {
        reject(err);
      }
      else {
        resolve();
      }
    });
  });
}

/**
 * @description Delete a user's
 * @param {number} userID
 */
function deleteUser(userID) {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM users WHERE id=?', [userID], (err) => {
      if (err) {
        reject(err);
      }
      else {
        resolve();
      }
    });
  });
}

/**
 * @description Checks if a user exists in the DB and returns the user's ID if it does
 * 
 * @param {Object} userInfo
 * @param {string} userInfo.email
 * @param {ng} userInfo.password
 */
function login(userInfo) {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM users WHERE email=? AND password=?', [
      userInfo.email,
      userInfo.password
    ], (err, result) => {
      if (err) {
        reject(err);
      } else if (result.length === 0) {
        reject('Forbidden');
      }
      else {
        // Return user's ID
        resolve(result[0].id);
      }
    });
  });
}

/**
 * @description Returns a single user metrics
 * @param {Number} userID User ID to get the metrics for
 */
function getUserMetrics(userID) {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM user_metrics WHERE user_id=?', [userID], (err, result) => {
      if (err) { return reject(err); }
      else if (result.length === 0) { reject('User metrics does not exist'); }
      else {
        // Convert back string objects to actual Objects
        result[0].history = JSON.parse(result[0].history);
        result[0].favorite_restaurants = JSON.parse(result[0].favorite_restaurants);
        result[0].favorite_food = JSON.parse(result[0].favorite_food);
        resolve(result);
      }
    });
  });
}


/**
 * 
 * @description Adds a new user metrics
 * @param {Number} userID
 * @param {Metrics} userMetrics
 */
function addUserMetrics(userID, userMetrics: Metrics) {
  return new Promise((resolve, reject) => {
    db.query(`INSERT INTO user_metrics (user_id, prefered_price, prefered_transportation_method,
                history, favorite_restaurants, favorite_food)
                VALUES (?, ?, ?, ?, ?, ?)`, [
        userID,
        userMetrics.prefered_price,
        userMetrics.prefered_transportation_method,
        JSON.stringify(userMetrics.history),
        JSON.stringify(userMetrics.favorite_restaurants),
        JSON.stringify(userMetrics.favorite_food)], (err) => {
          if (err) {
            reject(err);
          }
          else {
            resolve();
          }
        });
  });
}


function updateUserMetrics(userID, newMetrics) {
  return new Promise((resolve, reject) => {
    db.query(`UPDATE user_metrics
                SET prefered_price=?, prefered_transportation_method=?, history=?,
                favorite_restaurants=?, favorite_food=?
                WHERE user_id=?`, [
        newMetrics.prefered_price,
        newMetrics.prefered_transportation_method,
        JSON.stringify(newMetrics.history),
        JSON.stringify(newMetrics.favorite_restaurants),
        JSON.stringify(newMetrics.favorite_food),
        userID
      ], (err) => {
        if (err) {
          reject(err);
        }
        else {
          resolve();
        }
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
  addUserMetrics: addUserMetrics,
  getUserMetrics: getUserMetrics,
  updateUserMetrics: updateUserMetrics
};
