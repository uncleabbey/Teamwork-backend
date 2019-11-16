import {
  chai,
  app,
  expect,
  generateToken,
  invalidUser
} from './testHelper';

const url = '/api/v1/articles/5/comment';
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

describe('Comments', () => {
  it('valid user should comment on articles', done => {
    const commentBody = {
      comment: 'Marlians, Marlians, Marlians'
    };
    chai
      .request(app)
      .post(url)
      .set('Accept', 'application/json')
      .set('authorization', `Bearer ${token}`)
      .send(commentBody)
      .end((err, res) => {
        expect(res).to.have.status(201);
        const { data, status } = res.body;
        expect(status).to.equal('success');
        expect(data).to.be.an('object');
        expect(data).to.have.property('message');
        expect(data).to.have.property('createdOn');
        expect(data).to.have.property('articleTitle');
        expect(data).to.have.property('article');
        expect(data).to.have.property('comment');
        done();
      });
  });
  it('valid user should comment on articles', done => {
    const commentBody = {
      comment: 'Marlians, Marlians, Marlians'
    };
    chai
      .request(app)
      .post(url)
      .set('Accept', 'application/json')
      .set('authorization', `Bearer ${invalidToken}`)
      .send(commentBody)
      .end((err, res) => {
        expect(res).to.have.status(500);
        const { error, status } = res.body;
        expect(status).to.be.equal('error');
        expect(error).to.be.equal('Invalid Request!1');
        done();
      });
  });
});
