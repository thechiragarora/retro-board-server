import { Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import users from './users';
import jwtConfig from './jwtConfig';


// const anonAuth = passport.authenticate('local');

export const endAnonHandler = (req, res) => {
  if (req.body.email && req.body.password) {
    const { email } = req.body;
    const { password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      const payload = {
        id: user.id,
      };
      const token = jwt.sign(payload, jwtConfig.jwtSecret, {
        expiresIn: 60 * 60,
      });
      res.status(200).send({
        auth: true,
        token,
        message: 'user found & logged in',
      });
    } else {
      res.sendStatus(401);
    }
  } else {
    res.sendStatus(401);
  }
};
const router = Router();
router
  .post('/anonymous/login', endAnonHandler);

export default router;
