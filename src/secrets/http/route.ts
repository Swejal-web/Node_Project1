/* eslint-disable import/no-unresolved */
/* eslint-disable node/no-missing-import */
import express from 'express';
import * as secretController from 'secrets/http/controller/secrets.controller';

const secretRouter = express.Router();

secretRouter.route('/secrets').post(secretController.postSecret);
secretRouter.route('/private/:tokenId').get(secretController.getSingleSecret);
secretRouter
  .route('/secret/:tokenId')
  .post(secretController.getProtectedSingleSecret);

// eslint-disable-next-line import/prefer-default-export
export { secretRouter };
