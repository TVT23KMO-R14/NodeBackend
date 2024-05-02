const { use } = require('../routes/reviewRoute');
const pgPool = require('../dbconnection');

const sql = {
  GET_ALL_REVIEWS: `
              SELECT "review".*, "users"."userName"
              FROM "review"
              LEFT JOIN "users"
              ON "review"."user_idUser" = "users"."idUser"
                                `,
  GET_REVIEW: 'SELECT "review".*, "users"."userName" FROM "review" LEFT JOIN "users" ON "review"."user_idUser" = "users"."idUser" WHERE "idReview"=$1',
  REMOVE_REVIEW: 'DELETE FROM "review" WHERE "idReview"=$1',
  ADD_REVIEW: 'INSERT INTO "review" ("user_idUser", "idMovie", "rating", "review", "reviewType", "reviewImg", "reviewObjectName") VALUES ($1, $2, $3, $4, $5, $6, $7)',
  GET_ALL_REVIEWS_BY_USER: 'SELECT "review".*, "users"."userName" FROM "review" LEFT JOIN "users" ON "review"."user_idUser" = "users"."idUser" WHERE "user_idUser"=$1',
  GET_ALL_REVIEWS_BY_MOVIE: 'Select "review".*, "users"."userName" FROM "review" LEFT JOIN "users" ON "review"."user_idUser" = "users"."idUser" WHERE "idMovie"=$1'
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
    console.log(result);
    return result.rows[0];
  }
  catch (err) {
    throw new Error(err)
  }
}

async function addReview(idUser, idMovie, rating, review, reviewType, reviewImg, reviewObjectName) {
  try {
    let result = await pgPool.query(sql.ADD_REVIEW, [idUser, idMovie, rating, review, reviewType, reviewImg, reviewObjectName]);
    return result.rowCount
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