const pgPool = require('../dbconnection');
const bcrypt = require('bcrypt')

const sql = {
  REGISTER_USER: 'INSERT INTO users("firstName", "lastName", "userName", password, email) VALUES ($1,$2,$3,$4,$5)',
  GET_PASSWORD: 'SELECT password FROM users WHERE "userName"=$1',
  DELETE_USER: 'DELETE FROM users WHERE "userName"=$1'
}

async function register(firstName, lastName, userName, passwordHash, email) {
  try {
    await pgPool.query(sql.REGISTER_USER, [firstName, lastName, userName, passwordHash, email])
    console.log('Successfully registered new user');
  } catch (err) {
    throw new Error('Error inserting data into database', err)
  }

}

async function getPassword(username) {
  try {
    const result = await pgPool.query(sql.GET_PASSWORD, [username]);
    console.log('Successfully fetched password');
    console.log(result)
    console.log(username)
    return result.rowCount > 0 ? result.rows[0].password : 'salasana';

  } catch (err) {
    throw new Error('Error getting password', err)
  }
}

async function deleteUser(userName, password) {
  try {
    const passwordHash = await getPassword(userName);
    if (!passwordHash) {
      throw new Error('User not found');
    }

    const passwordMatch = await bcrypt.compare(password, passwordHash);
    if (!passwordMatch) {
      throw new Error('Incorrect password');
    }

    const result = await pgPool.query(sql.DELETE_USER, [userName]);
    if (result.rowCount > 0) {
      console.log(`${userName} deleted successfully.`);
      return `${userName} deleted successfully.`;
    } else {
      throw new Error('User not found'); 
    }
  } catch (err) {
    console.error('Error deleting user:', err);
    throw err;
  }
}

module.exports = { register, getPassword, deleteUser }   