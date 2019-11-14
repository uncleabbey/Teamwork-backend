import {
  chai,
  app,
  expect,
  generateToken,
  validUser,
  invalidUser,
  nonAdmin
} from './testHelper';

const url = '/api/v1/auth/create-user';
let token;
let invalidToken;
let nonAdminToken;

before(async () => {
  const validJwt = generateToken({
    userId: validUser.id,
    isAdmin: validUser.isAdmin
  });
  token = validJwt;
  const invalidJwt = generateToken({
    userId: invalidUser.id,
    isAdmin: invalidUser.isAdmin
  });
  invalidToken = invalidJwt;
  const nonAdminValidToken = generateToken({
    userId: nonAdmin.id,
    isAdmin: nonAdmin.isAdmin
  });
  nonAdminToken = nonAdminValidToken;
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
        expect(res).to.have.status(200);
        const { data, status } = res.body;
        expect(status).to.equal('success');
        expect(data).to.be.an('object');
        expect(data).to.have.property('isAdmin');
        expect(data).to.have.property('userId');
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