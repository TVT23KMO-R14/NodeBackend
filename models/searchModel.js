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

const getOneMovie = async (movieId) => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}`
    const params = {
        api_key: process.env.TMDB_API_KEY,
        language: 'en-US'
    }

    try {
        const response = await axios.get(url, { params })
        return response.data
    } catch (error) {
        console.error('Error fetching data from TMDB', error)
        throw new Error('Failed to fetch data from TMDB', error)
    }
}

const getOneSeries = async (seriesId) => {
    const url = `https://api.themoviedb.org/3/tv/${seriesId}`
    const params = {
        api_key: process.env.TMDB_API_KEY,
        language: 'en-US'
    }

    try {
        const response = await axios.get(url, { params })
        return response.data
    } catch (error) {
        console.error('Error fetching data from TMDB', error)
        throw new Error('Failed to fetch data from TMDB', error)
    }
}


module.exports = {
    getSearch,
    headerSearch,
    getOneMovie,
    getOneSeries
}