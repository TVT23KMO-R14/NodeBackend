const express = require('express');
const router = express.Router();
const groupMemberModel = require('../models/groupMemberModel')

router.get('/', (req, res) => {
    res.send('GroupMemberRoute toimii');
})

router.get('/allmembers', (req, res) => {
    groupMemberModel.getGroupMembers((err, groupMembers) => {
        if (err) {
            console.error('Tietokantakyselyn virhe', err);
            res.status(500).json({ error: 'Tietokantakyselyn virhe' });
        } else {
            res.json(groupMembers);
        }
    });
});

module.exports = router;