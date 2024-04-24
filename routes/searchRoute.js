const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();
const searchModel = require('../models/searchModel')

router.get('/', (req, res) => {
    res.send('searchModel toimii');
})

router.get('/quicksearch', async (req, res) => {
    api_key = process.env.TMDB_API_KEY;

    const { filter, page } = req.query;

    console.log(filter, page);

    const url = `https://api.themoviedb.org/3/` + filter;
    const params = { api_key, page };
    console.log(url);
    console.log(params);

    try {
        const response = await axios.get(url, { params });
        console.log(response.data);
        res.json(response.data);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error fetching data from TMDB' });
    }
});

router.get('/headersearch', async (req, res) => {
    const { page, query } = req.query;
    try {
        const results = await searchModel.headerSearch(page, query);
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data' });
    }
});

router.get('/onemovie', async (req, res) => {
    const { id } = req.query
    console.log(id)
    try {
        const results = await searchModel.getOneMovie(id)
        if (results === null) {
            res.status(404).json({ error: 'Movie not found' })
        } else {
            res.json(results);
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data' })
    }
})

router.get('/oneseries', async (req, res) => {
    const { id } = req.query
    console.log(id)
    try {
        const results = await searchModel.getOneSeries(id)
        if (results === null) {
            res.status(404).json({ error: 'Series not found' })
        } else {
            res.json(results);
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data' })
    }
})


module.exports = router;