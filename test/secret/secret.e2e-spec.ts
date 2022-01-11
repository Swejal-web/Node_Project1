/* eslint-disable no-undef */
/* eslint-disable import/extensions */
/* eslint-disable import/namespace */

// eslint-disable-next-line node/no-unpublished-import
import request from 'supertest';
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
    const { body } = await request(app.instance)
      .post('/api/secrets')
      .send({
        body: 'secret body goes here',
        password: 'secret',
        expiresIn: '1 day'
      })
      .expect(201);

    expect(body).toEqual(
      expect.objectContaining({
        body: 'secret body goes here',
        expiresIn: expect.objectContaining({
          day: 1
        })
      })
    );
  });

  // it('GET/secrets/:id should fetch entry', async () => {
  //   const id = uuid4();
  //   await createSecret({
  //     id:'d01c1cd6-ea09-479a-acdd-2ebab1992bdd',
  //     body: 'secret body goes here',
  //     password: 'secret',
  //     expiresIn: '7 days',
  //     expiresAt: '2022-01-11 06:52:36 +0000'
  //   });

  //   await request(app.instance)
  //     .get(`/private/d01c1cd6-ea09-479a-acdd-2ebab1992bdd`)
  //     .expect(200);
  // });

  afterAll(async () => {
    await app.close();
  });
});
