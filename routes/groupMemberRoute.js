const router = require('express').Router()

const { addUserToGroup, removeUserFromGroup, getGroupMembers, updateRole, getGroupMember, getGroupsByMember, getMembersByGroup } = require('../models/groupMemberModel')

router.post('/add', async (req, res) => {
    try {
        const result = await addUserToGroup(req.body.userId, req.body.groupId, req.body.role)
        res.render('groupAdded', { title: 'User added to group', message: result, userId: req.body.userId, groupId: req.body.groupId })
    } catch (err) {
        res.status(404).json({ error: err.message })
    }
    res.end()
}
)

router.delete('/remove', async (req, res) => {
    try {
        const result = await removeUserFromGroup(req.query.userId, req.query.groupId)
        res.render('groupAdded', { title: 'User removed from group', message: result, userId: req.query.userId, groupId: req.query.groupId })
    } catch (err) {
        res.status(404).json({ error: err.message })
    }
    res.end()
}
)

router.get('/all', async (req, res) => {
    try {
        const groupMembers = await getGroupMembers()
        res.json(groupMembers)
    } catch (err) {
        res.status(404).json({ error: err.message })
    }
}
)

router.get('/one', async (req, res) => {
    try {
        const groupMember = await getGroupMember(req.query.userId, req.query.groupId)
        res.json(groupMember)
    } catch (err) {
        res.status(404).json({ error: err.message })
    }
}
)

router.put('/update', async (req, res) => {
    try {
        const result = await updateRole(req.body.userId, req.body.groupId, req.body.role)
        res.render('groupAdded', { title: 'Role updated', message: result, userId: req.body.userId, groupId: req.body.groupId })
    } catch (err) {
        res.status(404).json({ error: err.message })
    }
    res.end()
}
)

router.get('/groupsbymember', async (req, res) => {
    try {
        const groups = await getGroupsByMember(req.query.userId)
        res.json(groups)
    } catch (err) {
        res.status(404).json({ error: err.message })
    }
}
)

router.get('/membersbygroup', async (req, res) => {
    try {
        const members = await getMembersByGroup(req.query.groupId)
        res.json(members)
    } catch (err) {
        res.status(404).json({ error: err.message })
    }
}
)



/*
  https://stackoverflow.com/questions/14934452/how-to-get-all-registered-routes-in-express

  function availableRoutes() {
  return app._router.stack // registered routes
    .filter(r => r.route)  // take out all the middleware
    .map(r => {
      return {
        path: r.route.path, // get the paths
        method: Object.keys(r.route.methods)[0].toUpperCase() // get the methods
      };
    });
}
*/

function getRoutes(router) {
    return router.stack.filter(r => r.route).map(r => {
        return {
            path: r.route.path,
            method: Object.keys(r.route.methods)[0].toUpperCase()
        }
    })
}

router.get('/', function (req, res) {
    try {
        const routes = getRoutes(router);
        res.render('listEndPoints', { title: 'Group EndPoints', routes })
    } catch (err) {
        res.status(404).json({ error: err.message })
    }
})

module.exports = router;