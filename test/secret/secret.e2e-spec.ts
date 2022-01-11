/* eslint-disable no-undef */
/* eslint-disable import/extensions */
/* eslint-disable import/namespace */

// eslint-disable-next-line node/no-unpublished-import
import request from 'supertest';
import { v4 as uuid4 } from 'uuid';
import { createExpiration } from 'secrets/exceptions';
import { createSecret } from '../factory/secret';
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

    // expect(body).toEqual(
    //   expect.objectContaining({
    //     secret: {
    //       body: 'secret body goes here',
    //       expiresAt: '2022-01-12T18:28:11.870+05:45',
    //       id: '1833ea7a-21d8-4f1c-88a5-63a11fc4b787',
    //       password:
    //         '$2b$05$ilqf5qoxANTHx7LYTy.0fOrMvJTN.eudBE41s5v/4h8qmhoY15r9i',
    //       expiresIn: expect.objectContaining({
    //         day: 1
    //       })
    //     }
    //   })
    // );
  });

  // it('GET/secrets/:id should fetch entry', async () => {
  //   const id = uuid4();
  //   await createSecret({
  //     id,
  //     body: 'secret body goes here',
  //     password: 'secret',
  //     expiresIn: '1 days',
  //     expiresAt: '2022-01-12T18:35:19.650+05:45'
  //   });

  //   await request(app.instance).get(`/api/private/${id}`).expect(200);
  // });

  afterAll(async () => {
    await app.close();
  });
});
