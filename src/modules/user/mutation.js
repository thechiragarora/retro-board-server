import jwt from 'jsonwebtoken';
import { User } from '../../model/collection';
import { dbService } from '../../services';
import jwtConfig from '../../config/jwtConfig';

const Mutation = {
  AnonymousLogin: async (_, { input }) => {
    console.log('::::::::::::::createUser::::::::::::Request', input);
    const password = 'password';
    const role = 'anonymous';
    let user = await dbService.findOne({ collection: User, data: { ...input } });
    if (!user) {
      user = await dbService.create({ collection: User, data: { ...input, password, role } });
    }
    console.log('::::::::::::::::createUser:::::::::::::Response', user);
    if (user) {
      const payload = {
        id: user.id,
      };
      const token = jwt.sign(payload, jwtConfig.jwtSecret, {
        expiresIn: 200 * 200,
      });
      return {
        token,
        user,
      };
    }
    return null; // handle later error case
  },
  googleLogin: async (_, { input }, req) => {
    const { token, user } = req;
    return {
      token,
      user,
    };
  },
};

export default Mutation;
