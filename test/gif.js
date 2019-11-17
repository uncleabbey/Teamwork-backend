import {
  chai,
  app,
  expect,
  generateToken,
  invalidUser
} from './helper/testHelper';

const url = '/api/v1/gifs/1';
let token;
let invalidToken;

before(async () => {
  const validJwt = await chai
    .request(app)
    .post('/api/v1/auth/signin')
    .send({
      email: 'richardCypher@gmail.com',
      password: '12345678'
    });
  token = validJwt.body.data.token;

  const invalidJwt = generateToken({
    userId: invalidUser.id,
    isAdmin: invalidUser.isAdmin
  });
  invalidToken = invalidJwt;
});

describe('Gifs Endpoint', () => {
  describe('Get Gifs', () => {
    it('should behave...', done => {
      chai
        .request(app)
        .get(url)
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          const { data, status } = res.body;
          expect(status).to.equal('success');
          expect(data).to.be.an('object');
          expect(data).to.have.property('message');
          expect(data).to.have.property('id');
          expect(data).to.have.property('createdOn');
          expect(data).to.have.property('title');
          expect(data).to.have.property('url');
          expect(data).to.have.property('comments');
          done();
        });
    });
    it('invalid user should not view individual gifs', done => {
      chai
        .request(app)
        .get(url)
        .set('authorization', `Bearer ${invalidToken}`)
        .end((err, res) => {
          expect(res).to.have.status(500);
          const { error, status } = res.body;
          expect(status).to.be.equal('error');
          expect(error).to.be.equal('Invalid Request!1');
          done();
        });
    });
    it('should error error when viewing a non existed gifs', done => {
      chai
        .request(app)
        .get('/api/v1/gifs/1000')
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res).to.have.status(400);
          const { error, status } = res.body;
          expect(status).to.be.equal('error');
          expect(error).to.be.equal('Gif not found in the database');
          done();
        });
    });
  });
});
