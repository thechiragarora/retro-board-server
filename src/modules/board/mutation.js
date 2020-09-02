import { ApolloError } from 'apollo-server-express';
import { Board } from '../../model/collection';
import { dbService } from '../../services';
import { pubsub, boardCreated } from '../../subscriptions';

const Mutation = {
  createBoard: async (_, { input }) => {
    const { name, columns, type } = input;
    let columnData = [...columns];
    columnData = columnData.map(column => ({ name: column }));
    const result = await dbService.create({
      collection: Board,
      data: { name, columns: columnData, type },
    });
    pubsub.publish(boardCreated, { boardCreated: result });
    return result;
  },
  deleteBoard: async (_, { id }) => {
    const result = await dbService.deleteOne({
      collection: Board, data: { id },
    });
    const { n } = result;
    if (n) {
      return 'Board deleted successfully';
    }
  },
};

export default Mutation;
