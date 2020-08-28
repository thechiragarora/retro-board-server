import jwt from 'jsonwebtoken';
import { User } from '../../model/collection';
import { dbService } from '../../services';
import jwtConfig from '../../config/jwtConfig';

const Mutation = {
  login: async (_, { input }) => {
    console.log('::::::::::::::createUser::::::::::::Request', input);
    const password = 'password';
    let user = await dbService.findOne({ collection: User, data: { ...input } });
    if (!user) {
      user = await dbService.create({ collection: User, data: { ...input, password } });
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
  userLogin: async (_, { input }, req)=> {
    // await dataSources.google.getAuth();
    // console.log(`3. resolver: hello`)
  //  await req.request.isAuth;
    // return `Hello ${args.name ? args.name : 'world'}!`
    console.log('innn here')
    // TODO: Response handling
    return 'sssss';
  },
};
export default Mutation;
