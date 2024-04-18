const { use } = require('../routes/groupRoute');
const pgPool = require('./pgConnection');

const sql = {
  GET_ALL_GROUPS: 'SELECT "idGroup", "groupName", "groupDescription" FROM group', 
  GET_GROUP: 'SELECT idGroup, groupName, groupDescription FROM group WHERE idGroup=$1',
}


async function getGroups() {
  let result = await pgPool.query(sql.GET_ALL_GROUPS);
  console.log(result.rows);
  return result.rows;
}

async function getGroup(groupId) {
  let result = await pgPool.query(sql.GET_GROUP, [groupId]);
  console.log(result.rows[0]);
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