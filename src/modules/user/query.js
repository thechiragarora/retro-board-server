/* eslint-disable no-param-reassign */
import jwt from 'jsonwebtoken';
import jwtConfig from '../../config/jwtConfig';
import { googleService } from '../../services';

const Query = {
  login: async (parent, args, req) => {
    console.log('innnnnn login')
    function generateUserToken() {
      console.log('context',req)
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
    }
    const result = await googleService.authentication();
    generateUserToken();
    return true;
  }
};

export default Query;
