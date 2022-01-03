const { truncateTables } = require("../../../tool")
const request = require("supertest")
const { app } = require("../../../../server")

describe('Testing Store API', function () {
  before(async function () {
    truncateTables();
  });

  it('should create a store', async function () {
    const manager = {
      name: 'John Cena',
    }

    const res = await request(app)
      .post('/manager')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send(manager)
      .expect(200);

    const store = {
      name: 'Store x',
      managerId: res.body.body.id,
    }

    const res2 = await request(app)
      .post('/store')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send(store)
      .expect(200);
  });

  it('should be get stores', async function () {
    await request(app)
      .get('/store')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  });

  it('should be get a store', async function () {
    await request(app)
      .get('/store/' + 1)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  });

  it('should be update a store', async function () {
    const store = {
      name: 'Store y',
    }

    await request(app)
      .put('/store/' + 1)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send(store)
      .expect(200);
  });

  it('should be delete a store', async function () {
    await request(app)
      .delete('/store/' + 1)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  });
});