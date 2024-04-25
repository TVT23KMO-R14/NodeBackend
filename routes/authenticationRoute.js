require('dotenv').config();
const router = require('express').Router();
const bcrypt = require('bcrypt')
const { register, getPassword, deleteUser } = require('..//models/authenticationModel')
const jwt = require('jsonwebtoken');
const { response } = require('express');
const { auth } = require('../middleware/auth');


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
  try {
    const uname = req.body.userName;
    const password = req.body.password;
    const db_pw = await getPassword(uname);

    if (db_pw) {
      const isAuth = await bcrypt.compare(password, db_pw);
      if (isAuth) {
        if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length === 0) {
          return res.status(500).json({ error: 'JWT_SECRET is not set or too short' });
        }
        const token = jwt.sign({ userName: uname }, process.env.JWT_SECRET);
        return res.status(200).json({ jwtToken: token });
      } else {
        return res.status(401).json({ error: 'Wrong password' });
      }
    }
  } catch (err) {
    if (err.message === 'User not found') {
      return res.status(404).json({ error: 'User not found' });
    } else {
      return res.status(500).json({ error: 'Internal server error: ' + err.message });
    }
  }
});


router.delete('/delete/:userName', auth, async (req, res) => {
  const userName = req.params.userName;
  const password = req.body.password;

  try {
    const message = await deleteUser(userName, password);
    res.status(200).json({ message: message });
  } catch (error) {
    console.log('authentication route' + error)
    res.status(500).json({ error: error.message });
  }
});



module.exports = router;