import jwtConfig from './jwtConfig';
import { User } from '../model/collection';
import { dbService } from '../services';
import { GOOGLE } from './loginConfig';

const passport = require('passport');
const passportJWT = require('passport-jwt');
const JWTstrategy = require('passport-jwt').Strategy;

const { ExtractJwt } = passportJWT;

const opts = {
  secretOrKey: jwtConfig.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
};

passport.use(
  'jwt',
  new JWTstrategy(opts, async (payload, done) => {
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
  }),
);

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


const passportConfig = {
  clientID: GOOGLE.clientID,
  clientSecret: GOOGLE.clientSecret,
  callbackURL: 'http://localhost:4000/auth/authentication/google/redirect',
};

const strategy = new GoogleStrategy(
  passportConfig,
  async (token, refreshToken, profile, done) => {
    // See if this user already exists
    const { id } = profile;
    let user = await dbService.findOne({
      collection: User,
      data: { googleId: id },
    });
    if (!user) {
      // They don't, so register them
      user = await dbService.create({
        collection: User,
        data: {
          name: profile.displayName,
          email: profile.emails[0].value,
          password: 'password',
          googleId: id,
        },
      });
    }
    return done(null, user);
  },
);
passport.use(strategy);
