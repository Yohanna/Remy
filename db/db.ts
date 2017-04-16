'use strict';

import * as mysql from 'mysql';
import * as config from '../config/config';
import * as logger from '../helpers/logger';
import { LoginInfo, User, Metrics, RecentSearch, UserAction, UserResult } from './db.d';

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
export function getUser(userID: number) {
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
export function getAllUsers(): Promise<object> {
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
export function addUser(newUser: User) {
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
 */
export function updateUser(userID: number, user: User) {
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
export function deleteUser(userID: number) {
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
 */
export function login(userInfo: LoginInfo) {
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
 * Returns a single user metrics
 */
export function getUserMetrics(userID: number) {
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
export function addUserMetrics(userID, userMetrics: Metrics) {
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


export function updateUserMetrics(userID, newMetrics) {
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

export function getRecentSearch(userID: number) {
  return new Promise((resolve, reject) => {
    db.query('SELECT search_results, timestamp FROM recent_searches WHERE user_id=?', [userID], (err, result: Array<RecentSearch>) => {
      if (err) { return reject(err); }
      else if (result.length === 0) { return reject('User does not have a recent search'); }

      for (let search of result) {
        // search_results are 'stringified' when added to the DB, we need to convert it back to a JSON
        search.search_results = JSON.parse((search.search_results as any));

        // for (let result of search.search_results) {
        //   logger.info(`${JSON.stringify(result.restaurant_details)}`);
        // }
      }

      return resolve(result);
    });
  });
}

export function addRecentSearch(newSearch: RecentSearch) {
  return new Promise((resolve, reject) => {
    db.query(`INSERT INTO recent_searches(user_id, search_results)
              VALUES(?, ?)`, [newSearch.user_id, JSON.stringify(newSearch.search_results)], (err, result) => {
        // Check if the user id entered is not in the users table (invalid foreign key)
        if (err && (err.code === 'ER_NO_REFERENCED_ROW' || err.code === 'ER_NO_REFERENCED_ROW_2')) {
          return reject('Foreign key constraint failed. Make sure the user id is already in the Users table');
        }
        else if (err) {
          // otherwise just return the err
          return reject(err);
        }
        return resolve(result.insertId)
      });
  });
}

/**
 * Get all the users with the associated actions they performed on restaurants
 * 
 * @param userID User id to search for
 */
export function getUserAction(userID: number) {
  return new Promise((resolve, reject) => {
    db.query(`SELECT restaurant_id, timestamp, action FROM user_actions WHERE user_id=? `, [userID], (err, result: Array<any>) => {
      if (err) { return reject(err); }
      else if (result.length === 0) { return reject('User does not have any actions'); }
      return resolve(result);
    });
  });
}

/**
 * Find all the restaurants that have 'actions' performed on them
 * 
 * @param restaurantID The place_id to query the DB for
 */
export function getRestaurantsAction(restaurantID: number) {
  return new Promise((resolve, reject) => {
    db.query(`SELECT user_id, timestamp, action FROM user_actions WHERE restaurant_id=? `, [restaurantID], (err, result: Array<any>) => {
      if (err) { return reject(err); }
      else if (result.length === 0) { return reject('User does not have any actions'); }
      return resolve(result);
    });
  });
}

export function addUserAction(action: UserAction) {
  return new Promise((resolve, reject) => {
    db.query(`INSERT INTO user_actions(user_id, restaurant_id, action)
              VALUES(?, ?, ?)`, [action.user_id, action.restaurant_id, action.action], (err, result) => {
        // Check if the user id entered is not in the users table (invalid foreign key)
        if (err && (err.code === 'ER_NO_REFERENCED_ROW' || err.code === 'ER_NO_REFERENCED_ROW_2')) {
          return reject('Foreign key constraint failed. Make sure the user id is already in the Users table');
        }
        else if (err) {
          // otherwise just return the err
          return reject(err);
        }
        resolve();
      });
  });
}

export function deleteUserAction(userID: number, restaurantID: string, timestamp: string) {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM user_actions WHERE user_id=? AND restaurant_id=? AND timestamp=?', [userID, restaurantID, timestamp], (err, results) => {
      err ? reject(err) : resolve({ affected_rows: results.affectedRows });
    });
  });
}

export function deleteRecentSearch(userID: number, searchID?: number) {
  return new Promise((resolve, reject) => {
    if (searchID) {
      db.query('DELETE FROM recent_searches WHERE user_id=? AND search_id=?', [userID, searchID], (err, results) => {
        err ? reject(err) : resolve({ affected_rows: results.affectedRows });
      });
    } else {
      db.query('DELETE FROM recent_searches WHERE user_id=?', [userID], (err, results) => {
        err ? reject(err) : resolve({ affected_rows: results.affectedRows });
      });
    }
  });
}
