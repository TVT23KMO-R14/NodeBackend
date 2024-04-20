const { getReviews, getReview, addReview, removeReview, getReviewsByUser, getReviewsByMovie } = require('../models/reviewModel')

const router = require('express').Router()

router.get('/all', async (req, res) => {
    try {
        const reviews = await getReviews()
        res.json(reviews)
    } catch (err) {
        res.status(404).json({ error: err.message })
    }
})

router.get('/one', async (req, res) => {
    try {
        const review = await getReview(req.query.idReview);
        console.log(review)
        res.json(review)
    } catch (err) {
        res.status(404).json({ error: err.message })
    }
})

router.post('/add', async (req, res) => {
    try {
        const result = await addReview(req.body.idUser, req.body.idMovie, req.body.rating, req.body.review);
        res.render('movieAdded', { title: 'Movie added', message: result, idMovie: req.body.idMovie, rating: req.body.rating, review: req.body.review });
    } catch (err) {
        res.status(404).json({ error: err.message })
    }
})

router.delete('/remove', async (req, res) => {
    try {
        const result = await removeReview(req.query.idReview);
        res.render('MovieAdded', { title: 'Movie removed', message: result, idReview: req.query.idReview });
    } catch (err) {
        res.status(404).json({ error: err.message })
    }
})

router.get('/byuser', async (req, res) => {
    try {
        const reviews = await getReviewsByUser(req.query.idUser);
        res.json(reviews)
    } catch (err) {
        res.status(404).json({ error: err.message })
    }
})

router.get('/bymovie', async (req, res) => {
    try {
        const reviews = await getReviewsByMovie(req.query.idMovie);
        res.json(reviews)
    } catch (err) {
        res.status(404).json({ error: err.message })
    }
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

router.get('/', function (req, res) {
    try {
        const routes = getRoutes(router);
        res.render('listEndPoints', { title: 'Group EndPoints', routes });
    } catch (err) {
        res.status(404).json({ error: err.message })
    }
});

module.exports = router;