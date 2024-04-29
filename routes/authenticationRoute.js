require('dotenv').config();
const router = require('express').Router();
const bcrypt = require('bcrypt')
const { register, getPasswordAndId, deleteUser } = require('..//models/authenticationModel')
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
  const uname = req.body.username;
  const password = req.body.password;
  console.log(uname)
  console.log(password)


  try {
    const db_pw = await getPasswordAndId(uname);
    console.log('Password and id fetched from db: ' + db_pw.rows[0].password + ' ' + db_pw.rows[0].idUser)
    if (db_pw) {
      const isAuth = await bcrypt.compare(password, db_pw.rows[0].password);
      if (isAuth) {
        if (process.env.JWT_SECRET === undefined || process.env.JWT_SECRET === null || process.env.JWT_SECRET.length === '') {
          res.status(500).json({ error: 'JWT_SECRET is not set or too short' })
        } else {
          //luodaan token
          const token = jwt.sign({ userName: uname }, process.env.JWT_SECRET)
          res.status(200).json({ jwtToken: token, id: db_pw.rows[0].idUser})
        }
      } else {
        res.status(401).json({ error: 'Wrong password' });
      }
    } else {
      res.status(404).json({ error: 'User not found: db_pw_vertailu' });
    }
  } catch (error) {
    console.log(error)
    res.status(404).json({ message: 'User not found: koko funktio', error: error });
  }
})

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