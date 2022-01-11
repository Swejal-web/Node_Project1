import express from 'express';
import * as secretController from 'secrets/http/controller/secrets.controller';

const secretRouter = express.Router();

secretRouter.route('/secrets').post(secretController.postSecret);

secretRouter.route('/private/:id').get(secretController.getSingleSecret);
secretRouter
  .route('/secret/:id')
  .post(secretController.getProtectedSingleSecret);

export { secretRouter };
