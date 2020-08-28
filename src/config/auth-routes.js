import passport from 'passport';
import jwt from 'jsonwebtoken';
import jwtConfig from './jwtConfig';
import authMiddleWare from '../lib/authMiddleWare';

const router = require('express').Router();

module.exports = router;

function generateUserToken(req, res, next) {
  const { user } = req;
  console.log(user);
  const token = jwt.sign({}, jwtConfig.jwtSecret, {
    expiresIn: 200 * 200,
    subject: user.id.toString(),
  });
  console.log('token', token);
  // res.redirect(`/home?token=${token}`);
  req.token = token;
  req.user = user;
  next();

}
router.get('/google', passport.authenticate('google', { session: false, scope: ['openid', 'profile', 'email'] }));
router.get(
  '/authentication/google/redirect',
  passport.authenticate('google', { session: false }),
  generateUserToken,
);

