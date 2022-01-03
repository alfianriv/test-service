const { truncateTables } = require("../../../tool")
const request = require("supertest")
const { app } = require("../../../../server")

describe('Testing Manager API', function () {
  before(async function () {
    truncateTables();
  });

  it('should create a manager', async function () {
    const manager = {
      name: 'John Cena',
    }

    const res = await request(app)
      .post('/manager')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send(manager)
      .expect(200);
  });

  it('should return all managers', async function () {
    await request(app)
      .get('/manager')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  });

  it('should return a manager', async function () {
    await request(app)
      .get('/manager/' + 1)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  });

  it('should be update a manager', async function () {
    const manager = {
      name: 'John Doe',
    }

    await request(app)
      .put('/manager/' + 1)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send(manager)
      .expect(200);
  });

  it('should be get manager with store', async function () {
    const store = {
      name: 'Store 1',
      managerId: 1,
    }

    await request(app)
      .post('/store')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send(store)
      .expect(200);

    await request(app)
      .get('/manager/' + 1 + '/store')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  });

  it('should be delete a manager', async function () {
    await request(app)
      .delete('/manager/' + 1)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  });


});