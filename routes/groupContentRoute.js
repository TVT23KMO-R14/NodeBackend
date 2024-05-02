const router = require('express').Router()

const { getGroupContent, getGroupContentByGroup, getGroupContentByUser, addGroupContent, removeGroupContent } = require('../models/groupContentModel')

router.get('/all', async (req, res) => {
    try {
        const groupContent = await getGroupContent()
        res.json(groupContent)
    } catch (err) {
        res.status(404).json({ error: err.message })
    }
}
)

router.get('/bygroup', async (req, res) => {
    try {
        const groupContent = await getGroupContentByGroup(req.query.groupId)
        if (groupContent.length === 0) {
            res.status(404).json({ error: 'No content found for group', status: 404})
        } else {
            res.json(groupContent)
        }
    } catch (err) {
        res.status(404).json({ error: err.message })
    }
}
)

router.get('/byuser', async (req, res) => {
    try {
        const groupContent = await getGroupContentByUser(req.query.userId)
        if (groupContent.length === 0) {
            res.status(404).json({ error: 'No content found for user', status: 404})
        } else {
            res.json(groupContent)
        }
    } catch (err) {
        res.status(404).json({ error: err.message })
    }
}
)

router.post('/add', async (req, res) => {
    try {
        const result = await addGroupContent(req.body.userId, req.body.groupId, req.body.contentId, reg.body.contentType, req.body.contentName, req.body.contentImg)
        res.status(201).json({message: "Content added", status: 201})
    } catch (err) {
        res.status(404).json({ error: err.message })
    }
    res.end()
}
)

router.delete('/remove', async (req, res) => {
    try {
        const result = await removeGroupContent(req.query.userId, req.query.groupId, req.query.contentId)
        if (result === 0) {
            res.status(404).json({ error: 'Content not found', status: 404})
        } else {
            res.status(200).json({message: "Content removed", status: 200})
        }
    } catch (err) {
        res.status(404).json({ error: err.message })
    }
    res.end()
}
)





/*
const { addUserToGroup, removeUserFromGroup, getGroupMembers, updateRole, getGroupMember, getGroupsByMember, getMembersByGroup, listAllGroupsWithMembership } = require('../models/groupMemberModel')

router.post('/add', async (req, res) => {
    try {
        const result = await addUserToGroup(req.body.userId, req.body.groupId, req.body.role)
        res.status(201).json({message: "User added to group", status: 201})
        //res.render('groupAdded', { title: 'User added to group', message: result, userId: req.body.userId, groupId: req.body.groupId })
    } catch (err) {
        res.status(404).json({ error: err.message })
    }
    res.end()
}
)

router.delete('/remove', async (req, res) => {
    try {
        const rowcount = await removeUserFromGroup(req.query.userId, req.query.groupId)
        if (rowcount === 0) {
            res.status(404).json({ error: 'User not found in group', status: 404})
        } else {
            res.status(200).json({message: "User removed from group", status: 200})
        }
        //res.render('groupAdded', { title: 'User removed from group', message: result, userId: req.query.userId, groupId: req.query.groupId })
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
        if (result === 0) {
            res.status(404).json({ error: 'User not found in group', status: 404})
        } else {
            res.status(200).json({message: "Role updated", status: 200})
        }
    } catch (err) {
        res.status(404).json({ error: err.message })
    }
    res.end()
}
)

router.get('/bymember', async (req, res) => {
    try {
        const groups = await getGroupsByMember(req.query.userId)
        if (groups.length === 0) {
            res.json([
                {
                    groupName: 'No groups found for user',
                }
            ])
        }else{
            res.json(groups)
        }
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
})

router.get('/membersbygroup', async (req, res) => {
    try {
        const members = await getMembersByGroup(req.query.groupId)
        if (members.length === 0) {
            res.status(404).json({error: 'No members found in group', status: 404})
        }else{
            res.json(members)
        }
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
})

router.get('/listallgroupswithmembership', async (req, res) => {
    try {
        const groups = await listAllGroupsWithMembership(req.query.userId)
        if (groups.length === 0) {
            res.status(404).json({error: 'No groups found', status: 404})
        }else{
            res.json(groups)
        }
    } catch (err) {
        res.status(404).json({ error: err.message })
    }
})
*/
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