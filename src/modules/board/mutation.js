import { ApolloError } from 'apollo-server-express';
import { Board } from '../../model/collection';
import { dbService } from '../../services';
import { pubsub, boardCreated } from '../../subscriptions';

const Mutation = {
  createBoard: async (_, { input }, req) => {
    // handle latter format of req.request
    if (!req.request.isAuth) {
      throw new ApolloError('User is not Authorized');
    }
    console.log(':::::::::::::createBoard:::::::::Request', input);
    const { name, columns, type } = input;
    let columnData = [...columns];
    columnData = columnData.map(column => ({ name: column }));
    const result = await dbService.create({
      collection: Board,
      data: { name, columns: columnData, type },
    });
    pubsub.publish(boardCreated, { boardCreated: result });
    console.log(':::::::::::::createBoard:::::::::Response', result);
    // TODO: Response handling
    return result;
  },
  deleteBoard: async (_, { id }, req) => {
    // handle latter format of req.request
    if (!req.request.isAuth) {
      throw new ApolloError('User is not Authorized');
    }
    console.log('::::::::::::::::::::deleteBoard:::::::::Request', id);
    const result = await dbService.deleteOne({
      collection: Board, data: { id },
    });
    console.log('::::::::::::::::deleteBoard:::::::::::::Response', result);
    const { n } = result;
    if (n) {
      return 'Board deleted successfully';
    }
  },
};

export default Mutation;
