const { getUsers, getUser } = require('../models/usersModel');
const { auth } = require('../middleware/auth');

const router = require('express').Router();

router.get('/all', async (req, res) => {
    const users = await getUsers();
    res.json(users);
});

router.get('/', async (req, res) => {
    const user = await getUser(req.query.username);
    console.log(user);
    res.json(user);
})


/* poistetaan tämä kokonaan jos ei tarvita muokattuna.
router.post('/note', auth, async (req, res) => {
    try {
        await addNote(res.locals.username, req.body.msg);
        res.end();
    } catch(err) {
        res.status(404).json({error: err.message});
    }
    
    res.end();
});
*/

module.exports = router;