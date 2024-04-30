const { getInvites, getInvite, addInvite, removeInvite, getInvitesByGroupAdmin } = require('../models/userInviteModel')

const router = require('express').Router()


router.get('/all', async (req, res) => {
  try {
    const invites = await getInvites()
    if (invites.length === 0) {
      res.status(404).json({ error: 'No invites found' })
    } else {
      res.json(invites)
    }
  } catch (err) {
    res.status(404).json({ error: err.message })
  }
})

router.get('/one', async (req, res) => {
  try {
    const invite = await getInvite(req.query.idInvite);
    if (invite.length === 0) {
      res.status(404).json({ error: 'Invite not found' })
    } else {
      res.json(invite)
    }
  } catch (err) {
    res.status(404).json({ error: err.message })
  }
})

router.post('/add', async (req, res) => {
  try {
    const result = await addInvite(req.body.userId, req.body.groupId, req.body.inviteText)
    if (result === 0) {
      res.status(404).json({ error: 'Invite not added', status: 404})
    }else{
      res.status(201).json({message: "Invite added", status: 201})
    }
  } catch (err) {
    res.status(404).json({ error: err.message })
  }
  res.end()
})

router.delete('/remove', async (req, res) => {
  try {
    const result = await removeInvite(req.query.idInvite)
    if (result === 0) {
      res.status(404).json({ error: 'Invite not found', status: 404})
    } else {
      res.status(200).json({message: "Invite removed", status: 200})
    }
  } catch (err) {
    res.status(404).json({ error: err.message })
  }
  res.end()
})

router.get('/bygroupadmin', async (req, res) => {
  try {
    const invites = await getInvitesByGroupAdmin(req.query.userId);
    if (invites.length === 0) {
      res.status(404).json({ error: 'No invites found' })
    } else {
      res.json(invites)
    }
  } catch (err) {
    console.log("Error:", err)
    res.status(404).json({ error: err.message })
  }
})

function getRoutes(router) {
  return router.stack.filter(r => r.route).map(r => {
      return {
        path: r.route.path,
        method: Object.keys(r.route.methods)[0].toUpperCase()
      };
    });
}

router.get('/', function(req, res) {
  try {
  const routes = getRoutes(router);
  res.render('listEndPoints', { title: 'Group EndPoints', routes })
  } catch (err) {
    res.status(404).json({ error: err.message })
  }
});

module.exports = router