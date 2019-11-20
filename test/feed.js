import {
  chai,
  app,
  expect,
  generateToken,
  invalidUser
} from './helper/testHelper';

const url = '/api/v1/feed';
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
describe('Feed Endpoint', () => {
  it('should get all gifs and article', done => {
    chai
      .request(app)
      .get(url)
      .set('authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        const { data, status } = res.body;
        expect(status).to.equal('success');
        expect(data).to.be.an('array');
        done();
      });
  });
  it('should get error for invalid users', done => {
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
});
