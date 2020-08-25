import jwtConfig from './jwtConfig';
import { User } from '../model/collection';
import { dbService } from '../services';

const passport = require('passport');
const passportJWT = require('passport-jwt');
const JWTstrategy = require('passport-jwt').Strategy;

const { ExtractJwt } = passportJWT;
const opts = {
  secretOrKey: jwtConfig.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
};


passport.use('jwt', new JWTstrategy(opts, async (payload, done) => {
  try {
    const { id } = payload;
    const user = await dbService.findOne({ collection: User, data: { id } });
    if (user) {
      done(null, user);
    } else {
      done(new Error('User not found'), null);
    }
  } catch (err) {
    done(err);
  }
}));
