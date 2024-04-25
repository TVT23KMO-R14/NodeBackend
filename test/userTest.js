let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let expect = chai.expect;

chai.use(chaiHttp);
let token
const userGlobal = {
  userName: 'test',
  password: 'test'
};
//use it."skip"('....')  for those tests that you dont want to run 

describe('POST /createUser', () => {
  it.skip('should create a new user', (done) => {
    const user = {
      firstName: 'test',
      lastName: 'test',
      userName: userGlobal.userName, //userName is unique so this needs to be changed if allready exist
      password: userGlobal.password,
      email: 'test@test.test'
    };
    chai.request(server)
      .post('/auth/register')
      .send(user)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('response', 'User created successfully');
        done();
      });
  });
  it.skip('Should notify that the username is already in use', (done) => {
    const user = {
      firstName: 'test',
      lastName: 'test',
      userName: userGlobal.userName,
      password: userGlobal.password,
      email: 'test@test.test'
    };
    chai.request(server)
      .post('/auth/register')
      .send(user)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('error', 'Registration failed');
        done();
      });
  });

});


describe('POST /login', () => {
  it.skip('should login with user', (done) => {

    chai.request(server)
      .post('/auth/login')
      .send(userGlobal)
      .end((err, res) => {
        if (err) done(err);
        token = res.body.jwtToken;
        expect(res).to.have.status(200);
        console.log(token)
        console.log(userGlobal)
        done();
      });
  });

  it('should return error if user is not found', (done) => {
    const user = {
      userName: 'wrong username',
      password: 'test'
    }
    chai.request(server)
      .post('/auth/login')
      .send(user)
      .end((err, res) => {
        if (err) done(err)
        expect(res).to.have.status(500)
        console.log(user)
        done()
      })
  }).timeout(5000)

  it.skip('should return error if username or password is wrong', (done) => {
    const user = {
      userName: 'test',
      password: 'wrong password'
    }
    chai.request(server)
      .post('/auth/login')
      .send(user)
      .end((err, res) => {
        if (err) done(err)
        expect(res).to.have.status(401)
        done()
      })
  })

});

/*
describe('DELETE /delete/:userName', () => {
  it('should delete a user with the correct password and return a success message', (done) => {


    chai.request(server)
      .delete('/auth/delete/' + userGlobal.userName)
      .set('Authorization', `Bearer ${token}`) // Removed this line as token is not needed
      .send(userGlobal)
      .end((err, res) => {
        if (err) return done(err); // Proper error handling

        expect(res).to.have.status(200); // Check for the correct response status code
        expect(res.body).to.have.property('message'); // Check if response contains 'message' property
        console.log('Response Message:', res.body.message);
        console.log('User Info:', userGlobal);

        done(); // Complete the test
      });
  });

  it.skip('should not delete a user with an incorrect password', (done) => {
    chai.request(server)
      .delete('/delete/test')
      .set('Authorization', `Bearer ${token}`)
      .send({ userName: 'test', password: 'wrongpassword' })
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('error', 'Incorrect password');
        done();
      });
  });
});
*/