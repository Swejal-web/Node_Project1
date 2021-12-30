import express from 'express';

declare global {
  namespace Express {
    interface Request {
      secretId?: Record<string, any>;
    }
  }
}
