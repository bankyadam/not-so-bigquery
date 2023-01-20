import { NextFunction, Request, Response } from 'express';

export default (req: Request, _res: Response, next: NextFunction): void => {
  console.log(`➡️ ${req.method} ${req.originalUrl}
    ❔ ${JSON.stringify(req.query)}
    📝 ${JSON.stringify(req.body)}`);
  next();
};
