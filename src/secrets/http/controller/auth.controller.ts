// /* eslint-disable consistent-return */
// /* eslint-disable import/no-unresolved */
// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';
// // eslint-disable-next-line node/no-missing-import
// import { AppError } from 'common/exception/AppError';
// // eslint-disable-next-line node/no-missing-import
// import { getSecret } from 'secrets/queries/get_secrets';

// // eslint-disable-next-line import/prefer-default-export
// export const protectSecret = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   //   const token = req.header('x-auth-token');

//   //   if (!token) {
//   //     return next(new AppError('no token.auth denied', 401));
//   //   }

//   //   try {
//   //     const decoded = jwt.verify(token, process.env.jwt_Secret);
//   //     console.log(decoded.secret);
//   //     req.secretId = decoded.secret;
//   //   } catch (err) {
//   //     res.status(401).json({ msg: 'Token is not valid' });
//   //   }

//   const secret = await getSecret.getId(req.params.id);

//   next();
// };
