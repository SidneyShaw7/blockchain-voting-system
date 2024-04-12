import { Router, Request, Response, NextFunction } from 'express';
import { registerUser } from '../controllers/userController';
import { userValidationRules } from '../validations/userValidations';
import { validationResult } from 'express-validator';

const router = Router();

router.post('/register', userValidationRules(), (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }
  registerUser(req, res)
    .then(() => {
      //  DONT FORGET TO HANDLE SUCCS REQ
    })
    .catch(next);
});

export default router;
