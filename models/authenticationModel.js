const pgPool = require('./pgConnection');

const sql = {
  REGISTER: 'INSERT INTO users VALUES ($1,$2,$3,$4,$5)',
  GET_PW: 'SELECT pw FROM student WHERE userName=$1'
}

async function register(firstName, lastName, userName, email, pwHash) {
  await pgPool.query(sql.REGISTER, [firstName, lastName, userName, email, pwHash])
}

async function getPw(username) {
  const result = await pgPool.query(sql.GET_PW, [username]);

  return result.rowCount > 0 ? result.rows[0].pw : null;

}

module.exports = {register, getPw} 