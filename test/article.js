import {
  chai,
  app,
  expect,
  generateToken,
  invalidUser
} from './testHelper';

const url = '/api/v1/articles';
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

describe('Create Article', () => {
  it('Admin/employee should create Article', done => {
    const articleBody = {
      title: 'Yellow Fever',
      article:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus unde itaque mollitia, soluta sit voluptate omnis beatae placeat veniam assumenda amet voluptas, nihil eos obcaecati in iusto! Fugit, deleniti ut.'
    };
    chai
      .request(app)
      .post(url)
      .set('Accept', 'application/json')
      .set('authorization', `Bearer ${token}`)
      .send(articleBody)
      .end((err, res) => {
        expect(res).to.have.status(201);
        const { data, status } = res.body;
        expect(status).to.equal('success');
        expect(data).to.be.an('object');
        expect(data).to.have.property('message');
        expect(data).to.have.property('articleId');
        expect(data).to.have.property('createdOn');
        expect(data).to.have.property('title');
        expect(data).to.have.property('userId');
        done();
      });
  });
  it('Invalid token should not be able to write articles', done => {
    const articleBody = {
      title: 'Yellow Fever',
      article:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus unde itaque mollitia, soluta sit voluptate omnis beatae placeat veniam assumenda amet voluptas, nihil eos obcaecati in iusto! Fugit, deleniti ut.'
    };
    chai
      .request(app)
      .post(url)
      .set('Accept', 'application/json')
      .set('authorization', `Bearer ${invalidToken}`)
      .send(articleBody)
      .end((err, res) => {
        expect(res).to.have.status(500);
        done();
      });
  });
});