import {
  chai,
  app,
  expect,
  generateToken,
  invalidUser
} from './helper/testHelper';

const url = '/api/v1/gifs/3/comment';
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

describe('Article Comments', () => {
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
        expect(data).to.have.property('gifTitle');
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
  it('should give error  for empty comments', done => {
    const commentBody = {
      comment: ''
    };
    chai
      .request(app)
      .post(url)
      .set('Accept', 'application/json')
      .set('authorization', `Bearer ${token}`)
      .send(commentBody)
      .end((err, res) => {
        expect(res).to.have.status(400);
        const { error, status } = res.body;
        expect(status).to.be.equal('Error');
        expect(error).to.be.equal(
          '"comment" is not allowed to be empty'
        );
        done();
      });
  });
});
