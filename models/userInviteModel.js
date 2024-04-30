const { use } = require('../routes/userInviteRoute')
const pgPool = require('../dbconnection')
const { get } = require('../app')

const sql = {
  GET_ALL_INVITES: 'SELECT "idGroupInvite", "groupMember_idGroupMember", "group_idGroup", "inviteText", "inviteUserId" FROM "groupInvite"',
  GET_INVITE: 'SELECT "idGroupInvite", "groupMember_idGroupMember", "group_idGroup", "inviteText", "inviteUserId" FROM "groupInvite" WHERE "idGroupInvite"=$1',
  REMOVE_INVITE: 'DELETE FROM "groupInvite" WHERE "idGroupInvite"=$1',
  ADD_INVITE: 'INSERT INTO "groupInvite" ("group_idGroup", "inviteText", "inviteUserId", "groupMember_idGroupMember") VALUES ($1, $2, $3, (SELECT "idGroupMember" FROM "groupMember" WHERE "role"=\'admin\' AND "group_idGroup"=$1))',
  GET_INVITES_BY_GROUP_ADMIN: 'SELECT g."idGroupInvite", g."groupMember_idGroupMember", g."group_idGroup", g."inviteText", g."inviteUserId" FROM "groupInvite" g INNER JOIN "groupMember" gm ON g."groupMember_idGroupMember" = gm."idGroupMember" WHERE gm."role" = \'admin\' AND gm."user_idUser" = $1'
}


async function getInvites() {
  try {
    const result = await pgPool.query(sql.GET_ALL_INVITES)
    console.log(result.rows)
    return result.rows
  } catch (err) {
    throw new Error(err)
  }
}

async function getInvite(idInvite) {
  try {
    const result = await pgPool.query(sql.GET_INVITE, [idInvite])
    console.log(result.rows[0])
    return result.rows[0]
  } catch (err) {
    throw new Error(err)
  }
}
/* req.body.userId, req.body.groupId, req.body.inviteText*/
async function addInvite(inviteUserId, group_idGroup, inviteText){
  console.log(inviteUserId, group_idGroup, inviteText)
  try {
    result = await pgPool.query(sql.ADD_INVITE, [group_idGroup, inviteText, inviteUserId])
    return result.rowCount
  } catch (err) {
    throw new Error(err)
  }
}

async function getInvitesByGroupAdmin(userId) {
  try {
    const result = await pgPool.query(sql.GET_INVITES_BY_GROUP_ADMIN, [userId])
    return result.rows
  } catch (err) {
    throw new Error(err)
  }
}

async function removeInvite(inviteId) {
  try {
    const result = await pgPool.query(sql.REMOVE_INVITE, [inviteId]);
    console.log(result.rowCount)
    return result.rowCount
  } catch (err) {
    throw new Error(err)
  }
}

module.exports = { getInvites, getInvite, addInvite, removeInvite, getInvitesByGroupAdmin }