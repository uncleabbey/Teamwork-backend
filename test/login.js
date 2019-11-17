import { chai, app, expect } from './helper/testHelper';

describe('Testing User Login Endpoint', () => {
  it('Admin/Employee should log in', async () => {
    const user = {
      email: 'kaylanAmnell@gmail.com',
      password: '12345678'
    };
    const res = await chai
      .request(app)
      .post('/api/v1/auth/signin')
      .set('Accept', 'application/json')
      .send(user);
    expect(res).to.have.status(200);
    const { status, data } = res.body;
    expect(status).to.equal('success');
    expect(data).to.be.a('object');
    expect(data).to.have.property('isAdmin');
    expect(data).to.have.property('userId');
    expect(data).to.have.property('token');
    expect(data).to.have.property('message');
  });
  it('should not sign in incorrect email', async () => {
    const user = {
      email: 'papa007@gmail.com',
      password: 'oshaysinger'
    };
    const res = await chai
      .request(app)
      .post('/api/v1/auth/signin')
      .set('Accept', 'application/json')
      .send(user);
    expect(res.status).to.equal(500);
  });
  it('should not sign in a user with incorrect password ', done => {
    const user = {
      email: 'kaylanAmnell@gmail.com',
      password: 'canibalism'
    };
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .set('Accept', 'application/json')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        const { status, error } = res.body;
        expect(status).to.be.equal('error');
        expect(error).to.be.equal('Incorrect Password');
        done();
      });
  });
});
