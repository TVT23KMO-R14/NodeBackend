const pgPool = require('../dbconnection')

const sql = {
  REGISTER_USER: 'INSERT INTO users("firstName", "lastName", "userName", password, email) VALUES ($1,$2,$3,$4,$5)',
  GET_PASSWORD: 'SELECT password, "idUser" FROM users WHERE "userName"=$1'
}

async function register(firstName, lastName, userName, passwordHash, email) {
  try {
    await pgPool.query(sql.REGISTER_USER, [firstName, lastName, userName, passwordHash, email])
    console.log('Successfully registered new user');
  } catch(err) {
      throw new Error('Error inserting data into database', err)
  }
}  

async function getPasswordAndId(username) {
  try {
    console.log('Fetching password for user: ' + username)
    const result = await pgPool.query(sql.GET_PASSWORD, [username]);
    console.log('Successfully fetched password');
    console.log('Resultti'+ result)
    console.log('Username' + username)
    console.log('Password' + result.rows[0].password)
    console.log('IdUser' + result.rows[0].idUser)
    if (result.rowCount > 0) {
      return result
    } else {
      throw new Error('User not found')
    }    
  } catch(err) {
    throw new Error('Error getting password', err)
  }
}

module.exports = {register, getPasswordAndId}