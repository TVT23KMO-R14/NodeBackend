const { use } = require('../routes/reviewRoute');
const pgPool = require('../dbconnection');

const sql = {
    GET_GROUP_CONTENT: 'SELECT * FROM "groupContent"',
    GET_GROUP_CONTENT_BY_GROUP: 'SELECT * FROM "groupContent" WHERE "group_idGroup"=$1',
    GET_GROUP_CONTENT_BY_USER: 'SELECT * FROM "groupContent" WHERE "user_idUser"=$1',
    ADD_GROUP_CONTENT: 'INSERT INTO "groupContent" ("user_idUser", "group_idGroup", "content_idContent", "contentType", "contentName", "contentImg") VALUES ($1, $2, $3, $4, $5, $6)',
    REMOVE_GROUP_CONTENT: 'DELETE FROM "groupContent" WHERE "user_idUser"=$1 AND "group_idGroup"=$2 AND "content_idContent"=$3'
}

async function getGroupContent() {
    try {
        let result = await pgPool.query(sql.GET_GROUP_CONTENT);
        console.log(result.rows);
        return result.rows;
    }
    catch (err) {
        throw new Error(err)
    }
}

async function getGroupContentByGroup(idGroup) {
    try {
        let result = await pgPool.query(sql.GET_GROUP_CONTENT_BY_GROUP, [idGroup]);
        console.log(result.rows);
        return result.rows;
    }
    catch (err) {
        throw new Error(err)
    }
}

async function getGroupContentByUser(idUser) {
    try {
        let result = await pgPool.query(sql.GET_GROUP_CONTENT_BY_USER, [idUser]);
        console.log(result.rows);
        return result.rows;
    }
    catch (err) {
        throw new Error(err)
    }
}

async function addGroupContent(idUser, idGroup, idContent, contentType, contentName, contentImg) {
    try {
        let result = await pgPool.query(sql.ADD_GROUP_CONTENT, [idUser, idGroup, idContent, contentType, contentName, contentImg]);
        return result.rowCount
    } catch (err) {
        throw new Error(err)
    }
}

async function removeGroupContent(idUser, idGroup, idContent) {
    try {
        let result = await pgPool.query(sql.REMOVE_GROUP_CONTENT, [idUser, idGroup, idContent]);
        console.log(result.rowCount)
        return result.rowCount
    } catch (err) {
        throw new Error(err)
    }
}

module.exports = { getGroupContent, getGroupContentByGroup, getGroupContentByUser, addGroupContent, removeGroupContent };