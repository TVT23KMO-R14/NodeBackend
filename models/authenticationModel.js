const pgPool = require('./pgConnection');

const sql = {
  REGISTER: 'INSERT INTO users ("firstName", "lastName", "userName", "password", "email")',
  GET_PASSWORD: 'SELECT password FROM users WHERE userName=$1'
}

async function register(firstName, lastName, userName, passwordHash, email) {
  try {
    await pgPool.query(sql.REGISTER, [firstName, lastName, userName, passwordHash, email])
    console.log("User registered successfully");
    return { success: true };
  } catch {
    console.error('Registration failed:', error);
    return { success: false, error: error.message };
  }
}  

async function getPassword(username) {
  const result = await pgPool.query(sql.GET_PASSWORD, [username]);

  return result.rowCount > 0 ? result.rows[0].pw : null;

}

module.exports = {register, getPassword}  