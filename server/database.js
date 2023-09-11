import mysql from 'mysql2'


const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: "shadow!",
  database: 'login',
  waitForConnections: true,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});


export function createUser(username, password){
    const added = db.query(`INSERT INTO login_app(username, password)
    VALUES (?, ?);
    `, [username, password]);
    return added;
} 

export function loginUser(username, password){
    return new Promise((resolve, reject) => {  
      const check = `SELECT * FROM login_app WHERE username = ?`;
      db.query(check, [username], (err, results, fields) => {
        if (err) {
          console.error('Error executing query:', err);
          reject("false");
        }
        if (results.length > 0 && results[0].password === password) {
          resolve("true");
        } else {
          resolve("false");
        }
      });})

}
