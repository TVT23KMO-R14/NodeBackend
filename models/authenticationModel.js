const pgPool = require('./pgConnection');

const sql = {
  REGISTER_USER: 'INSERT INTO users("firstName", "lastName", "userName", password, email) VALUES ($1,$2,$3,$4,$5)',
  GET_PASSWORD: 'SELECT password FROM users WHERE userName=$1'
}

async function register(firstName, lastName, userName, passwordHash, email) {
  await pgPool.query(sql.REGISTER_USER, [firstName, lastName, userName, passwordHash, email])
}  

async function getPassword(username) {
  const result = await pgPool.query(sql.GET_PASSWORD, [username]);

  return result.rowCount > 0 ? result.rows[0].pw : null;

}

module.exports = {register, getPassword}  