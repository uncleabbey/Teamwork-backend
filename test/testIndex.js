import { chai, app, expect } from './testHelper';

describe('index js', () => {
  it('should display welcome message succesfully', done => {
    chai
      .request(app)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        const { data, status } = res.body;
        expect(status).to.equal('success');
        expect(data).to.be.an('object');
        expect(data.message).to.be.equal('Welcome to Teamwork API');
        done();
      });
  });
  it('should display Error if route was not found', done => {
    chai
      .request(app)
      .get('/status')
      .end((err, res) => {
        expect(res).to.have.status(404);
        const { data, status } = res.body;
        expect(status).to.equal('error');
        expect(data).to.be.an('object');
        expect(data.message).to.be.equal('404 Page Not Found');
        done();
      });
  });
});
