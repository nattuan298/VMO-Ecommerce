import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app.js'

chai.should();

chai.use(chaiHttp);

describe('Users API', () => {
  //test Get user
  describe('GET /api/v1/users', () => {
    it('it should GET all the tasks', (done) => {
      chai.request(app)
        .get('/api/v1/users')
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('array');
          response.body.length.should.be.eq(2);
          done();
        })
    })
  })
  describe('POST /api/v1/login', () => {
    it('it should POST login the user', (done) => {
      chai.request(app)
        .post('/api/v1/login')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({ username: 'username', password: 'password' })
        .end(function (response) {
          response.should.have.status(200);
          response.body.should.not.to.be.empty;
          response.body.should.to.be.an('object');
          done();
        })
    })
  })
})