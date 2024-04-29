let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let expect = chai.expect;
console.log = function noConsole() {

}

chai.use(chaiHttp);
let token
const userGlobal = {
  userName: 'test',
  password: 'test'
};
//use it."skip"('....')  for those tests that you don't want to run 

describe('POST /createUser', () => {
  it('should create a new user', (done) => {
    const user = {
      firstName: 'test',
      lastName: 'test',
      userName: userGlobal.userName, //userName is unique so this needs to be changed if already exist
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
  it('Should notify that the username is already in use', (done) => {
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
  it('should login with user', (done) => {
    console.log('testi 1 login: ' + userGlobal.userName)
    const user = {
      username: userGlobal.userName, //userName is unique so this needs to be changed if already exist
      password: userGlobal.password,
    }
    chai.request(server)
      .post('/auth/login')
      .send(user)
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
      username: 'wrong username',
      password: 'test'
    }
    chai.request(server)
      .post('/auth/login')
      .send(user)
      .end((err, res) => {
        if (err) done(err)
        expect(res).to.have.status(500)
        expect(res.body).to.have.property('error'); 
        console.log('Response Message:', res.body.error);
        done()
      })
  }).timeout(5000)

  it('should return error if password is wrong', (done) => {
    const user = {
      username: 'test',
      password: 'wrong password'
    }
    chai.request(server)
      .post('/auth/login')
      .send(user)
      .end((err, res) => {
        if (err) done(err)
        expect(res).to.have.status(401)
        expect(res.body).to.have.property('error'); 
        console.log('Response Message:', res.body.error);

        done()
      })
  })

});


describe('DELETE /delete/:userName', () => {
  it('should delete a user with the correct password and return a success message', (done) => {

    chai.request(server)
      .delete('/auth/delete/' + userGlobal.userName)
      .set('Authorization', `Bearer ${token}`) 
      .send(userGlobal)
      .end((err, res) => {
        if (err) return done(err); 

        expect(res).to.have.status(200); 
        expect(res.body).to.have.property('response'); 
        console.log('Response Message:', res.body.response);
        console.log('User Info:', userGlobal);

        done();
      });
  });
  it('should not delete user with wrong credentials', (done) => {
    const user = {
      userName: 'wrong username',
      password: 'wrong password'
    }
    chai.request(server)
      .delete('/auth/delete/' + user.userName)
      .set('Authorization', `Bearer ${token}`)
      .send(user)
      .end((err, res) => { 
        if (err) return done(err);
  
        expect(res).to.have.status(500);
        expect(res.body).to.have.property('error');
        console.log('error', res.body.error);
        console.log('User Info:', user);
  
        done();
      });
  });
  it('should not delete user without jwt token', (done) => {
    const user = {
      userName: 'wrong username',
      password: 'wrong password'
    }
    chai.request(server)
      .delete('/auth/delete/' + user.userName)
      .send(user)
      .end((err, res) => { 
        if (err) return done(err);
  
        expect(res).to.have.status(403);
        expect(res.body).to.have.property('error');
        console.log('error', res.body.error);
        console.log('User Info:', user);
  
        done();
      });
  });
})  

  