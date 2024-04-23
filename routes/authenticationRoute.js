require('dotenv').config();
const router = require('express').Router();
const bcrypt = require('bcrypt')
const { register, getPassword } = require('..//models/authenticationModel')
const jwt = require('jsonwebtoken');
const { response } = require('express');


router.post('/register', async (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const userName = req.body.userName;
  const password = req.body.password;
  const email = req.body.email;


  const hashPw = await bcrypt.hash(password, 10);
  try {
    await register(firstName, lastName, userName, hashPw, email);
    res.status(201).json({ response: 'User created successfully' });
  } catch (error) {
    res.status(404).json({ error: 'Registration failed' })
  }

});

router.post('/login', async (req, res) => {
  const uname = req.body.userName;
  const password = req.body.password;

  const db_pw = await getPassword(uname);

  if (db_pw) {
    const isAuth = await bcrypt.compare(password, db_pw);
    if (isAuth) {
      if (process.env.JWT_SECRET === undefined || process.env.JWT_SECRET === null || process.env.JWT_SECRET.length === '') {
        res.status(500).json({ error: 'JWT_SECRET is not set or too short' })
      } else {
        //luodaan token
        const token = jwt.sign({ userName: uname }, process.env.JWT_SECRET);
        res.status(200).json({ jwtToken: token });
      }
    } else {
      res.status(401).json({ error: 'Wrong password' });
    }
  } else {
    res.status(404).json({ error: 'User not found' });
  }

})


module.exports = router;