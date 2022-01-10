/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import express from 'express';

declare global {
  namespace Express {
    interface Request {
      secretId?: Record<string, any>;
    }
  }
}
