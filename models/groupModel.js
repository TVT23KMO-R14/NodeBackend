const { use } = require('../routes/groupRoute');
const pgPool = require('../dbconnection');

const sql = {
  GET_ALL_GROUPS: 'SELECT "idGroup", "groupName", "groupDescription" FROM "group"',
  GET_GROUP: 'SELECT "idGroup", "groupName", "groupDescription" FROM "group" WHERE "idGroup"=$1',
  REMOVE_GROUP: 'DELETE FROM "group" WHERE "idGroup"=$1',
  ADD_GROUP: 'INSERT INTO "group" ("groupName", "groupDescription") VALUES ($1, $2)',
}

async function getGroups() {
  let result = await pgPool.query(sql.GET_ALL_GROUPS);
  console.log(result.rows);
  return result.rows;
}

async function getGroup(idGroup) {
  let result = await pgPool.query(sql.GET_GROUP, [idGroup]);
  console.log(result.rows[0]);
  return result.rows[0];
}

async function addGroup(groupName, groupDescription) {
  try {
    await pgPool.query(sql.ADD_GROUP, [groupName, groupDescription]);
    return "Group added successfully!"
  } catch (err) {
    throw new Error(err)
  }
}

async function removeGroup(groupId) {
  try {
    let result = await pgPool.query(sql.REMOVE_GROUP, [groupId]);
    console.log(result.rowCount)
    return result.rowCount
  } catch (err) {
    throw new Error(err)
  }
}

module.exports = { getGroups, getGroup, addGroup, removeGroup};