import {
  chai,
  app,
  expect,
  generateToken,
  invalidUser
} from './helper/testHelper';

const url = '/api/v1/flag';
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
describe('flag', () => {
  it('should flag as inappropriate', done => {
    const flagBody = {
      id: 2,
      type: 'gif'
    };
    chai
      .request(app)
      .post(url)
      .set('Accept', 'application/json')
      .set('authorization', `Bearer ${token}`)
      .send(flagBody)
      .end((err, res) => {
        expect(res).to.have.status(201);
        const { data, status } = res.body;
        expect(status).to.equal('success');
        expect(data).to.be.an('object');
        done();
      });
  });
  it('should error when invalid ', done => {
    const flagBody = {
      id: 2,
      type: 'gif'
    };
    chai
      .request(app)
      .post(url)
      .set('Accept', 'application/json')
      .set('authorization', `Bearer ${invalidToken}`)
      .send(flagBody)
      .end((err, res) => {
        expect(res).to.have.status(500);
        const { error, status } = res.body;
        expect(status).to.be.equal('error');
        expect(error).to.be.equal('Invalid Request!1');
        done();
      });
  });
});
