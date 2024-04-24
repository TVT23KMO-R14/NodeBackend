const { use } = require('../routes/reviewRoute')
const pool = require('../dbconnection')

const sql = {
    ADD_MEMBER: 'INSERT INTO "groupMember" ("user_idUser", "group_idGroup", "role") VALUES ($1, $2, $3)',
    REMOVE_MEMBER: 'DELETE FROM "groupMember" WHERE "user_idUser"=$1 AND "group_idGroup"=$2',
    GET_ALL_MEMBERS: 'SELECT * FROM "groupMember"',
    GET_MEMBER: 'SELECT * FROM "groupMember" WHERE "user_idUser"=$1 AND "group_idGroup"=$2',
    UPDATE_ROLE: 'UPDATE "groupMember" SET "role"=$3 WHERE "user_idUser"=$1 AND "group_idGroup"=$2',
    GET_ALL_MEMBERS_BY_GROUP: 'SELECT * FROM "groupMember" WHERE "group_idGroup"=$1',
    GET_ALL_GROUPS_BY_MEMBER: 'SELECT * FROM "groupMember" WHERE "user_idUser"=$1'
}

async function addUserToGroup(userId, groupId, role) {
    try {
        await pool.query(sql.ADD_MEMBER, [userId, groupId, role])
        return "User added to group successfully!"
    } catch (err) {
        throw new Error(err)
    }
}

async function removeUserFromGroup(userId, groupId) {
    try {
        let result = await pool.query(sql.REMOVE_MEMBER, [userId, groupId])
        return result.rowCount
    } catch (err) {
        throw new Error(err)
    }
}

async function getGroupMembers() {
    try {
        let result = await pool.query(sql.GET_ALL_MEMBERS)
        return result.rows
    } catch (err) {
        throw new Error(err)
    }
}

async function getGroupMember(userId, groupId) {
    try {
        let result = await pool.query(sql.GET_MEMBER, [userId, groupId])
        return result.rows[0]
    } catch (err) {
        throw new Error(err)
    }
}

async function updateRole(userId, groupId, role) {
    try {
        result = await pool.query(sql.UPDATE_ROLE, [userId, groupId, role])
        return result.rowCount
    } catch (err) {
        throw new Error(err)
    }
}

async function getGroupsByMember(userId) {
    try {
        let result = await pool.query(sql.GET_ALL_GROUPS_BY_MEMBER, [userId])
        return result.rows
    } catch (err) {
        throw new Error(err)
    }
}

async function getMembersByGroup(groupId) {
    try {
        let result = await pool.query(sql.GET_ALL_MEMBERS_BY_GROUP, [groupId])
        return result.rows
    } catch (err) {
        throw new Error(err)
    }
}

module.exports = { addUserToGroup, removeUserFromGroup, getGroupMembers, updateRole, getGroupMember, getGroupsByMember, getMembersByGroup }