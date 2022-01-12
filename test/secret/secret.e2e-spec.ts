/* eslint-disable no-undef */
/* eslint-disable import/extensions */
/* eslint-disable import/namespace */

// eslint-disable-next-line node/no-unpublished-import
import request from 'supertest';
import { v4 as uuid4 } from 'uuid';
import { createExpiration } from 'secrets/exceptions';
import { createSecret, getSecret } from '../factory/secret';
// eslint-disable-next-line import/no-unresolved
import { AppFactory } from '../factory/app';

describe('Secret e2e', () => {
  let app: AppFactory;

  beforeAll(async () => {
    app = await AppFactory.new();
  });

  beforeEach(async () => {
    await app.refreshDatabase();
  });

  it('POST/ secrets create a new secret', async () => {
    await request(app.instance)
      .post('/api/secrets')
      .send({
        body: 'secret body goes here',
        password: 'secret',
        expiresIn: '1 day'
      })
      .expect(201);
  });

  it('GET/private/:id should fetch entry', async () => {
    const id = uuid4();
    await createSecret({
      id,
      body: 'secret body goes here',
      password: 'secret',
      expiresIn: '1 days',
      expiresAt: createExpiration.makeExpiration('1 days')
    });

    await request(app.instance).get(`/api/private/${id}`).expect(200);
  });

  it('POST/secret/:id should view the data', async () => {
    const id = uuid4();
    await createSecret({
      id,
      body: 'secret body goes here',
      password: null,
      expiresIn: '1 days',
      expiresAt: createExpiration.makeExpiration('1 days')
    });
    const response = await getSecret(id);
    if (response.password) {
      const { body } = await request(app.instance)
        .post(`/api/secret/${id}`)
        .send({ password: 'secret' })
        .expect(201);
      expect(body).toEqual(
        expect.objectContaining({ secret: 'secret body goes here' })
      );
    }
    const { body } = await request(app.instance)
      .post(`/api/secret/${id}`)
      .send({ password: '' })
      .expect(200);
    expect(body).toEqual(
      expect.objectContaining({ secret: 'secret body goes here' })
    );
  });

  afterAll(async () => {
    await app.close();
  });
});
