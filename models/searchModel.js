const pool = require('../dbconnection')

const getSearch = (callback) => {
    pool.query('SELECT * FROM "testiSchema"."groupMembers"', (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result.rows);
        }
    });
};

module.exports = {
    getSearch
}