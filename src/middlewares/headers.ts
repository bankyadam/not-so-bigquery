import { NextFunction, Request, Response } from 'express';

export default (_req: Request, res: Response, next: NextFunction): void => {
  res.set({
    'x-content-type-options': 'nosniff',
    'x-frame-options': 'SAMEORIGIN',
    'x-xss-protection': '0'
  });
  next();
};
