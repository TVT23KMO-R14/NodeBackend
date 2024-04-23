const { getGroups, getGroup, addGroup, removeGroup} = require('../models/groupModel')

const router = require('express').Router()

router.get('/all', async (req, res) => {
  try {
    const group = await getGroups()
    res.json(group)
  } catch (err) {
    res.status(404).json({ error: err.message })
  }
})

router.get('/one', async (req, res) => {
  try {
    const group = await getGroup(req.query.groupId);
    console.log(group)
    res.json(group)
  } catch (err) {
    res.status(404).json({ error: err.message })
  }
})

router.post('/add', async (req, res) => {
  try {
    const result = await addGroup(req.body.groupName, req.body.groupDescription, req.body.groupLogo)
    res.status(201).json({ message: result })
    //res.render('result', { title: 'Group added', message: result, groupname: req.body.groupName, groupdescription: req.body.groupDescription, grouplogo: req.body.groupLogo});
  } catch (err) {
    res.status(404).json({ error: err.message })
  }
  res.end()
})

router.delete('/remove', async (req, res) => {
  try {
    const result = await removeGroup(req.query.groupId)
    res.render('result', { title: 'Group removal result', message: 'Returned value:', groupname: 'deleted rows: ' + result});
  } catch (err) {
    res.status(404).json({ error: err.message })
  }
  res.end()
})

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
      };
    });
}

router.get('/', function(req, res) {
  try {
  const routes = getRoutes(router);
  res.render('listEndPoints', { title: 'Group EndPoints', routes });
  } catch (err) {
    res.status(404).json({ error: err.message })
  }
});

module.exports = router;