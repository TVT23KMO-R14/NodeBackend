const { use } = require('../routes/usersRoute');
const pgPool = require('../dbconnection');

const sql = {
  GET_ALL_USERS: 'SELECT "idUser", "firstName", "lastName", "userName", email FROM users', 
  GET_USER: 'SELECT "idUser", "firstName", "lastName", "userName", email FROM "users" WHERE "idUser"=$1',
}


async function getUsers() {
  try {
    const result = await pgPool.query(sql.GET_ALL_USERS);
    console.log(result.rows)
    return result.rows;
  } catch (err) {
    throw new Error(err);
  }
}

async function getUser(idUser) {
  try {
    const result = await pgPool.query(sql.GET_USER, [idUser]);
    console.log(result.rows[0])
    return result.rows[0];
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = { getUsers, getUser };

