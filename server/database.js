import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()


const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: process.env.PASSWORD,
  database: 'login',
  waitForConnections: true,
  maxIdle: 10,
  idleTimeout: 60000, 
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

export function checkUser(username) {
  let dbQuery = []
  const check = `SELECT * FROM login_app WHERE username = ?`;
  db.query(check, [username], (err, results, field) => {
    dbQuery = results
  })
  if(dbQuery.length > 0){
    return true
  } else {
    return false
  }
}

export function createUser(username, password){
    const added = db.query(`INSERT INTO login_app(username, password)
    VALUES (?, ?);
    `, [username, password]);
    return added;
} 

export function getUserPass(username) {
  return new Promise((resolve, reject) => {
    const check = `SELECT * FROM login_app WHERE username = ?`;
    db.query(check, [username], (err, results, fields) => {
      if (err) {
        reject(err);
      }
      if (results.length > 0) {
        db.query(`SELECT password FROM login_app WHERE username = ?`, [username], (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result[0].password);
          }
        });
      } else {
        reject("Error: User or password does not exist");
      }
    });
  });
}


