import { Request, Response, NextFunction } from 'express';

export const parseJsonFields = (fields: string[]) => (req: Request, _res: Response, next: NextFunction) => {
  fields.forEach((field) => {
    if (req.body[field]) {
      try {
        req.body[field] = JSON.parse(req.body[field]);
      } catch (e) {
        console.error(`Failed to parse field ${field}:`, e);
      }
    }
  });
  next();
};
