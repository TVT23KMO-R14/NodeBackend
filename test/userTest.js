let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let expect = chai.expect;

chai.use(chaiHttp);

describe('POST /createUser', () => {
  it.skip('should create a new user', (done) => {
    const user = {
      firstName: 'test',
      lastName: 'test',
      userName: 'test',
      password: 'test',
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
      userName: 'test',
      password: 'test',
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
  it('should create a new user', (done) => {
    const user = {
      userName: 'asd',
      password: 'asd'
    };
    chai.request(server) 
      .post('/auth/login') 
      .send(user) 
      .end((err, res) => {
        if (err) done(err); 
        expect(res).to.have.status(200); 
        done();
      });
  });
  it('should return error if user is not found', (done) => {
    const user = {
      userName: 'asdqwez',
      password: 'asd'
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

  it('should return error if username or password is wrong', (done) => {
    const user = {
      userName: 'asd',
      password: 'asdlk'
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



