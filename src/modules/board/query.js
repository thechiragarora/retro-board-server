import { ApolloError } from 'apollo-server-express';
import { Board } from '../../model/collection';
import { dbService } from '../../services';

const Query = {
  getBoard: async (_, { input }, req) => {
    // handle latter format of req.request
    if (!req.request.isAuth) {
      throw new ApolloError('User is not Authorized');
    }
    const result = await dbService.findOne({ collection: Board, data: { ...input } });
    // TODO: Response handling
    return result;
  },
  getBoards: async (_, { input }, req) => {
    // handle latter format of req.request
    if (!req.request.isAuth) {
      throw new ApolloError('User is not Authorized');
    }
    const result = await dbService.find({ collection: Board, data: { ...input } });
    // TODO: Response handling
    return result;
  },
};

export default Query;
