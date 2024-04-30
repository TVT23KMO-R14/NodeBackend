const { auth } = require('../middleware/auth')
const { getUser } = require('../models/usersModel')

const router = require('express').Router()

router.get('/one', auth, async (req, res) => {
    try {
    console.log("req.query.userId", req.query.userId)
    const userInfo = await getUser(req.query.userId)
    res.status(200).json(userInfo)        
    } catch (err) {
        console.log("/one Error:", err)
        res.status(404).json({ error: err})
    }
})

module.exports = router;