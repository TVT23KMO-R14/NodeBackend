const { use } = require('../routes/reviewRoute');
const pgPool = require('./pgConnection');

const sql = {
  GET_ALL_REVIEWS: 'SELECT * FROM "review"',
  GET_REVIEW: 'SELECT * FROM "review" WHERE "idReview"=$1',
  REMOVE_REVIEW: 'DELETE FROM "review" WHERE "idReview"=$1',
  ADD_REVIEW: 'INSERT INTO "review" ("user_idUser", "idMovie", "rating", "review") VALUES ($1, $2, $3, $4)',
  GET_ALL_REVIEWS_BY_USER: 'SELECT * FROM "review" WHERE "user_idUser"=$1',
  GET_ALL_REVIEWS_BY_MOVIE: 'SELECT * FROM "review" WHERE "idMovie"=$1',
}


async function getReviews() {
  try {
    let result = await pgPool.query(sql.GET_ALL_REVIEWS);
    console.log(result.rows);
    return result.rows;
  }
  catch (err) {
    throw new Error(err)
  }
}

async function getReview(idReview) {
  try {
    let result = await pgPool.query(sql.GET_REVIEW, [idReview]);
    console.log(result.rows[0]);
    return result.rows[0];
  }
  catch (err) {
    throw new Error(err)
  }
}

async function addReview(idUser, idMovie, rating, review) {
  try {
    await pgPool.query(sql.ADD_REVIEW, [idUser, idMovie, rating, review]);
    return "Review added successfully!"
  } catch (err) {
    throw new Error(err)
  }
}

async function removeReview(idReview) {
  try {
    let result = await pgPool.query(sql.REMOVE_REVIEW, [idReview]);
    console.log(result.rowCount)
    return result.rowCount
  } catch (err) {
    throw new Error(err)
  }
}

async function getReviewsByUser(idUser) {
  try {
    let result = await pgPool.query(sql.GET_ALL_REVIEWS_BY_USER, [idUser]);
    console.log(result.rows);
    return result.rows;
  }
  catch (err) {
    throw new Error(err)
  }
}

async function getReviewsByMovie(idMovie) {
  try {
    let result = await pgPool.query(sql.GET_ALL_REVIEWS_BY_MOVIE, [idMovie]);
    console.log(result.rows);
    return result.rows;
  }
  catch (err) {
    throw new Error(err)
  }
}

module.exports = { getReviews, getReview, addReview, removeReview, getReviewsByUser, getReviewsByMovie };