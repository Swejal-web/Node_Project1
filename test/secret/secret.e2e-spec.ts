/* eslint-disable import/extensions */
/* eslint-disable node/no-missing-import */

// eslint-disable-next-line node/no-unpublished-import
import request from 'supertest';
import { v4 as uuid4 } from 'uuid';
// eslint-disable-next-line import/no-unresolved
import { AppFactory } from '../factory/app';
// eslint-disable-next-line import/no-unresolved
import { createSecret } from '../factory/secret';

describe('Secret e2e', () => {
  let app: AppFactory;

  beforeAll(async () => {
    app = await AppFactory.new();
  });

  beforeEach(async () => {
    await app.refreshDatabase();
  });

  it('POST/ secrets create a new secret', async () => {
    const { body } = await request(app.instance)
      .post('/secrets')
      .send({
        body: 'secret body goes here',
        password: 'secret',
        expiresIn: '03:02:01'
      })
      .expect(201);

    expect(body).toEqual(
      expect.objectContaining({
        body: 'secret body goes here',
        expiresIn: expect.objectContaining({
          hours: 3,
          minutes: 2,
          seconds: 1
        })
      })
    );
  });

  it('GET/secrets/:id should fetch entry', async () => {
    const id = uuid4();
    await createSecret({
      id,
      body: 'secret body goes here',
      password: 'secret',
      expiresIn: '03:02:01'
    });

    const { body } = await request(app.instance)
      .get(`/secrets/${id}`)
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
