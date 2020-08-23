import jwtConfig from './jwtConfig';
import users from './users';

const passport = require('passport');
const passportJWT = require('passport-jwt');
const JWTstrategy = require('passport-jwt').Strategy;

const { ExtractJwt } = passportJWT;
const params = {
  secretOrKey: jwtConfig.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
};


passport.use('login', new JWTstrategy(params, ((payload, done) => {
  try {
    console.log('payload', payload);
    const user = users.find(userObj => userObj.id === payload.id) || null;
    console.log('user', user)
    if (user) {
      done(null, user);
    } else {
      done(new Error('User not found'), null);
    }
  } catch (err) {
    done(err);
  }
})));
