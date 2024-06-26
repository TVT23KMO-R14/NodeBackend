const pgPool = require('../dbconnection');
const bcrypt = require('bcrypt')

const sql = {
  REGISTER_USER: 'INSERT INTO users("firstName", "lastName", "userName", password, email) VALUES ($1,$2,$3,$4,$5)',
  GET_PASSWORD: 'SELECT password, "idUser" FROM users WHERE "userName"=$1',
  DELETE_USER: 'DELETE FROM users WHERE "userName"=$1'
}

async function register(firstName, lastName, userName, passwordHash, email) {
  try {
    await pgPool.query(sql.REGISTER_USER, [firstName, lastName, userName, passwordHash, email])
    console.log('Successfully registered new user');
  } catch (err) {
    console.log('Username already in use')
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
    const error = new Error("no user found")
    error.status = "500"
    throw error
    //console.error('Error getting password:', err.message);
    //throw new Error('Error getting password ' + err.message)
  }
}


async function deleteUser(userName, password) {
  try {
    const passwordAndId = await getPasswordAndId(userName);
    const passwordHash = passwordAndId.rows[0].password
    if (!passwordHash) {
      throw new Error('User not found');
    }
    console.log('authModel user info: ' + userName + ' ' + password + ' ' + passwordHash)
    const passwordMatch = await bcrypt.compare(password, passwordHash);
    if (!passwordMatch) {
      throw new Error('Incorrect password');
    }

    const result = await pgPool.query(sql.DELETE_USER, [userName]);
    if (result.rowCount > 0) {
      console.log(`${userName} deleted successfully.`);
      return `${userName} deleted successfully.`;
    } else {
      throw new Error('Incorrect password'); 
    }
  } catch (err) {
    console.error('Error deleting user:', err);
    throw err;
  }
}

module.exports = { register, getPasswordAndId, deleteUser }   