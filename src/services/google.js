import passport from 'passport';
import jwt from 'jsonwebtoken';
import jwtConfig from '../config/jwtConfig';
import { RESTDataSource } from 'apollo-datasource-rest';

class Google extends RESTDataSource {
  authentication = async (req) => {


    await passport.authenticate('google', { session: false, scope: ['openid', 'profile', 'email'] })
    return passport.authenticate('google', { session: false })
  }
}

export default new Google();
