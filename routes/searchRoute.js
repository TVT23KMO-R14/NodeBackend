const express = require('express');
const router = express.Router();
const searchModel = require('../models/searchModel')

router.get('/', (req, res) => {
    res.send('searchModel toimii');
})

module.exports = router;