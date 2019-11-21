import {
  chai,
  app,
  expect,
  generateToken,
  invalidUser
} from './helper/testHelper';

const url = '/api/v1/search';
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
describe('Search', () => {
  it('should search articles by tags', done => {
    const tagsBody = {
      tags: 'Funny'
    };
    chai
      .request(app)
      .get(url)
      .set('Accept', 'application/json')
      .set('authorization', `Bearer ${token}`)
      .send(tagsBody)
      .end((err, res) => {
        expect(res).to.have.status(200);
        const { data, status } = res.body;
        expect(status).to.equal('success');
        expect(data.message).to.be.equal(
          'article successfully retrieved'
        );
        expect(data.data).to.be.an('array');
        done();
      });
  });
  it('should throw when invalid user search articles by tags', done => {
    const tagsBody = {
      tags: 'Funny'
    };
    chai
      .request(app)
      .get(url)
      .set('Accept', 'application/json')
      .set('authorization', `Bearer ${invalidToken}`)
      .send(tagsBody)
      .end((err, res) => {
        expect(res).to.have.status(500);
        const { error, status } = res.body;
        expect(status).to.be.equal('error');
        expect(error).to.be.equal('Invalid Request!1');
        done();
      });
  });
  it('should return message when articles is not found', done => {
    const tagsBody = {
      tags: 'hhggg'
    };
    chai
      .request(app)
      .get(url)
      .set('Accept', 'application/json')
      .set('authorization', `Bearer ${token}`)
      .send(tagsBody)
      .end((err, res) => {
        expect(res).to.have.status(200);
        const { data, status } = res.body;
        expect(status).to.equal('success');
        expect(data.message).to.be.equal(
          'No Article has that tag in the database'
        );
        done();
      });
  });
});
