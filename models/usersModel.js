const { use } = require('../routes/usersRoute');
const pgPool = require('../dbconnection');

const sql = {
  GET_ALL_USERS: 'SELECT "idUser", "firstName", "lastName", "userName", email FROM users', 
  GET_USER: 'SELECT idUser, firstName, lastName, userName FROM users WHERE userName=$1',
}


async function getUsers() {
  let result = await pgPool.query(sql.GET_ALL_USERS);

  console.log(result.rows);
  return result.rows;
}

async function getUser(username) {
  let result = await pgPool.query(sql.GET_USER, [username]);
  return result.rows[0];
}

/* poistetaan tämä kokonaan ellei tarvitse muokattuna johonkin.
async function addNote(username, msg) {
  try {
    await pgPool.query(sql.ADD_NOTE, [msg, username]);
  } catch(err) {
      //throw new Error('Username not found!')
      throw new Error(err)
  }
  
}
*/

module.exports = { getUsers, getUser };

