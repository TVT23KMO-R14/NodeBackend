const { use } = require('../routes/groupRoute')
const pgPool = require('../dbconnection')

const sql = {
  GET_ALL_GROUPS: 'SELECT "idGroup", "groupName", "groupDescription" FROM "group"',
  GET_GROUP: 'SELECT "idGroup", "groupName", "groupDescription" FROM "group" WHERE "idGroup"=$1',
  REMOVE_GROUP: 'DELETE FROM "group" WHERE "idGroup"=$1',
  ADD_GROUP: 'INSERT INTO "group" ("groupName", "groupDescription", "groupLogo") VALUES ($1, $2, $3)',
}

async function getGroups() {
  try {
    const result = await pgPool.query(sql.GET_ALL_GROUPS)
    console.log(result.rows)
    return result.rows
  } catch (err) {
    throw new Error(err)
  }
}

async function getGroup(idGroup) {
  try {
    const result = await pgPool.query(sql.GET_GROUP, [idGroup])
    console.log(result.rows[0])
    return result.rows[0]
  } catch (err) {
    throw new Error(err)
  }
}

async function addGroup(groupName, groupDescription, groupLogo) {
  try {
    result = await pgPool.query(sql.ADD_GROUP, [groupName, groupDescription, groupLogo])
    return result.rowCount
  } catch (err) {
    throw new Error(err)
  }
}

async function removeGroup(groupId) {
  try {
    const result = await pgPool.query(sql.REMOVE_GROUP, [groupId]);
    console.log(result.rowCount)
    return result.rowCount
  } catch (err) {
    throw new Error(err)
  }
}

module.exports = { getGroups, getGroup, addGroup, removeGroup }