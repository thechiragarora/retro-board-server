/* eslint-disable no-unused-vars */
import passport from 'passport';
import { ApolloError } from 'apollo-server-express';
import passportCongif from '../config/passport';


const authMiddleWare = async (req, res, next) => {
  try {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err || info !== undefined) {
        req.isAuth = false;
        next();
      } else {
        req.isAuth = true;
        req.user = user;
        next();
      }
    })(req, res, next);
  } catch (err) {
    throw new ApolloError(err);
  }
};

export default authMiddleWare;
