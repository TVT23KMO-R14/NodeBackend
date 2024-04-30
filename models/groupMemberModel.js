const { use } = require('../routes/reviewRoute')
const pool = require('../dbconnection')

const sql = {
    ADD_MEMBER: 'INSERT INTO "groupMember" ("user_idUser", "group_idGroup", "role") VALUES ($1, $2, $3)',
    REMOVE_MEMBER: 'DELETE FROM "groupMember" WHERE "user_idUser"=$1 AND "group_idGroup"=$2',
    GET_ALL_MEMBERS: 'SELECT * FROM "groupMember"',
    GET_MEMBER: 'SELECT * FROM "groupMember" WHERE "user_idUser"=$1 AND "group_idGroup"=$2',
    UPDATE_ROLE: 'UPDATE "groupMember" SET "role"=$3 WHERE "user_idUser"=$1 AND "group_idGroup"=$2',
    GET_ALL_MEMBERS_BY_GROUP: 'SELECT "groupMember"."group_idGroup", "groupMember"."role", "groupMember"."user_idUser", "users"."userName" FROM "groupMember" JOIN "users" ON "groupMember"."user_idUser" = "users"."idUser" WHERE "groupMember"."group_idGroup" = $1',
    GET_ALL_GROUPS_BY_MEMBER: 'SELECT "idGroup", "groupName", "groupDescription", "groupLogo" FROM "group" WHERE "idGroup" IN (SELECT "group_idGroup" FROM "groupMember" WHERE "user_idUser"=$1)',
    LIST_ALL_GROUPS_WITH_MEMBERSHIP: `
    SELECT "group".*, 
        CASE 
            WHEN "groupMember"."user_idUser" IS NOT NULL THEN TRUE 
            ELSE FALSE 
            END AS "isMember"
    FROM "group"
    LEFT JOIN "groupMember" 
    ON "group"."idGroup" = "groupMember"."group_idGroup" AND "groupMember"."user_idUser" = $1
    ORDER BY "isMember" DESC, "group"."groupName" ASC
    `
}

async function listAllGroupsWithMembership(userId) {
    try {
        console.log(userId)
        const result = await pool.query(sql.LIST_ALL_GROUPS_WITH_MEMBERSHIP, [userId]);
        return result.rows;
    } catch (err) {
        throw new Error(err);
    }
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
        console.log("UserId: "+ userId + " result.rows: ", result.rows)
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

module.exports = { addUserToGroup, removeUserFromGroup, getGroupMembers, updateRole, getGroupMember, getGroupsByMember, getMembersByGroup, listAllGroupsWithMembership }