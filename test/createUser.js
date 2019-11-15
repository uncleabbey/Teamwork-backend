import {
  chai,
  app,
  expect,
  generateToken,
  invalidUser
} from './testHelper';

const url = '/api/v1/auth/create-user';
let token;
let invalidToken;
let nonAdminToken;

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

  const nonAdminValidJwt = await chai
    .request(app)
    .post('/api/v1/auth/signin')
    .send({
      email: 'johnDoe@example.com',
      password: '12345678'
    });
  nonAdminToken = nonAdminValidJwt.body.data.token;
});

describe('Creating Employees', () => {
  it('Admin should create employee', done => {
    const user = {
      email: 'Laun@gmail.com',
      password: '12345678',
      firstName: 'Labo',
      lastName: 'Obo',
      isAdmin: false,
      gender: 'Female',
      jobRole: 'Cleaner',
      department: 'Admin',
      address: 'Ikeja Lagos'
    };
    chai
      .request(app)
      .post(url)
      .set('Accept', 'application/json')
      .set('authorization', `Bearer ${token}`)
      .send(user)
      .end((err, res) => {
        expect(res).to.have.status(201);
        const { data, status } = res.body;
        expect(status).to.equal('success');
        expect(data).to.be.an('object');
        expect(data).to.have.property('isAdmin');
        expect(data).to.have.property('userId');
        expect(data).to.have.property('message');
        done();
      });
  });
  it('Invalid User should not be able to created user', done => {
    const user = {
      email: 'Laundry@gmail.com',
      password: '12345678',
      firstName: 'Launder',
      lastName: 'Money',
      isAdmin: false,
      gender: 'Male',
      jobRole: 'Cleaner',
      department: 'Utilities',
      address: 'Akowonjo'
    };
    chai
      .request(app)
      .post(url)
      .set('Accept', 'application/json')
      .set('authorization', `Bearer ${invalidToken}`)
      .send(user)
      .end((err, res) => {
        expect(res).to.have.status(500);
        done();
      });
  });
  it('Employees without Admin privilege should not create new Employee', done => {
    const user = {
      email: 'NewEmployee@gmail.com',
      password: '12345678',
      firstName: 'New',
      lastName: 'Employee',
      isAdmin: false,
      gender: 'Male',
      jobRole: 'Cleaner',
      department: 'Utilities',
      address: 'Akowonjo'
    };
    chai
      .request(app)
      .post(url)
      .set('Accept', 'application/json')
      .set('authorization', `Bearer ${nonAdminToken}`)
      .send(user)
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
});
