const { auth } = require('../middleware/auth')
const { getUser } = require('../models/usersModel')

const router = require('express').Router()

router.get('/one', auth, async (req, res) => {
    try {
        console.log("query: ", req.query)
        console.log("userId: " + req.query.userId)
        console.log("headers: ", req.headers)
        const user = await getUser(req.query.userId)
        res.json(user);
    } catch (err) {
        console.log("/one Error: ", err)
        res.status(404).json({ error: err})
    }
})

module.exports = router;