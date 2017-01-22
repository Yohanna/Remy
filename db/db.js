const sqlite3 = require('sqlite3');


function initializeDB(cb) {
  const db = new sqlite3.Database('D:/Projects/Repos/Remy/db/remy.sqlite', sqlite3.OPEN_READWRITE, function (err) {
    if (err) throw err;

    cb(db);
  });
}


// initializeDB(demo);

// function demo(db) {
//   let user = 3;

//   db.all(`SELECT * FROM users where id = ${user}`, function (err, rows) {
//     // db.all('SELECT * FROM users', function (err, rows) {
//     if (err) throw err;
//     console.log(rows);
//   });

// }

function getUser(user_id, cb) {

  initializeDB(function (db) {

    db.all(`SELECT * FROM users WHERE id = ${user_id}`, function (err, rows) {
      if (err) {
        console.log(err);
        cb(err, null);
      } else {
        cb(null, rows);
      }
    });

  });

}


/**
 * @description Gets a user from db
 * @param {number} user_id User ID to get
 */
// function getUser(user_id) {
//   return new Promise(function (resolve, reject) {
//     db.serialize(function () {
//       db.all(`SELECT * FROM users WHERE id = ${user_id}`, function (err, rows) {
//         if (err) {
//           console.log(err);
//           reject(err);
//         }

//         resolve(rows);
//       });
//     });
//   }

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
