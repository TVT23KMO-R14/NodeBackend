const pool = require('../dbconnection')
const axios = require('axios');


const getSearch = (callback) => {
    pool.query('SELECT * FROM "testiSchema"."groupMembers"', (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result.rows);
        }
    });
};


const headerSearch = async (page, query) => {
    const movieUrl = `https://api.themoviedb.org/3/search/movie`;
    const tvUrl = `https://api.themoviedb.org/3/search/tv`;
    const params = {
        api_key: process.env.TMDB_API_KEY,
        page,
        query, 
        include_adult: false,
        language: 'en-US'
    };

    try {
        // Tekee movie ja tv requestit ja yhdistää ne 
        const [movieResponse, tvResponse] = await Promise.all([
            axios.get(movieUrl, { params }),
            axios.get(tvUrl, { params })
        ]);

        const combinedResults = {
            movies: movieResponse.data.results,
            tvShows: tvResponse.data.results
        };
        
        return combinedResults;
    } catch (error) {
        console.error('Error fetching data from TMDB', error);
        return {
            success: false,
            message: 'Failed to fetch data from TMDB',
            error: error.message
        };
    }
};


module.exports = {
    getSearch,
    headerSearch
}