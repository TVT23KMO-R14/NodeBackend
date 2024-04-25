let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let expect = chai.expect;

chai.use(chaiHttp);
let token
let loginRes
//use it."skip"('....')  for those tests that you dont want to run 

describe('POST /createUser', () => {
  it.skip('should create a new user', (done) => {
    const user = {
      firstName: 'test',
      lastName: 'test',
      userName: 'test', //userName is unique so this needs to be changed if allready exist
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
  it('should login with user', (done) => {
    const user = {
      userName: 'test',
      password: 'test'
    };
    chai.request(server)
      .post('/auth/login')
      .send(user)
      .end((err, res) => {
        if (err) done(err);
        token = res.body.jwtToken;
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should return error if user is not found', (done) => {
    const user = {
      userName: 'asdqwez',
      password: 'test'
    }
    chai.request(server)
      .post('/auth/login')
      .send(user)
      .end((err, res) => {
        if (err) done(err)
        expect(res).to.have.status(404)
        done()
      })
  })

  it('should return error if username or password is wrong', (done) => {
    const user = {
      userName: 'test',
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

//tässä kasa toimimattomia delete testejä kaikki alla.
describe('DELETE /delete/:userName', () => {
  it.skip('should delete a user with the correct password and return a success message', (done) => {
    chai.request(server)
      .delete('/delete/:test')
      .set('Authorization', `Bearer ${token}`)
      .send({ username: "test", password: "test" })
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('response', 'User deleted successfully');
        done();
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


describe('DELETE /delete/:userName', () => {
  it.skip('should delete a user', async function () {
    const userData = {
      userName: 'test',
      password: 'test', 
    };

    const loginRes = await request(app)
      .post('/auth/login')
      .send(userData);
    expect(loginRes.status).to.equal(200);
    const validToken = loginRes.body.jwtToken;
    const deleteRes = await request(app)
      .delete(`auth/delete/test`) 
      .set('Authorization', `Bearer ${validToken}`)
      .send({ password: 'test' }); 

    
    expect(deleteRes.status).to.equal(200);
  });
});


describe('DELETE /delete/test', () => {
  it('should delete a user with the correct password and return a success message', (done) => {
    chai.request(server)
      .delete('/delete/test')
      .set('Authorization', `Bearer ${token}`)
      .send({ password: "test" }) 
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(200);  
        expect(res.body).to.have.property('response', 'User deleted successfully');
        done();
      });
  });
});
