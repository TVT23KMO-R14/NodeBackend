require('dotenv').config()
const jwt = require('jsonwebtoken')


function auth(req, res, next) {
  // Authorization:Bearer token
  const token = req.headers.authorization?.split(' ')[1];

  try {
    const username = jwt.verify(token, process.env.JWT_SECRET).username;
    res.locals.username = username;
    next();
  } catch(err) {
      res.status(403).json({error: err});
  }

}

module.exports = {auth};