import { pubsub, boardCreated } from '../../subscriptions';

export default {
  boardCreated: {
    subscribe: () => pubsub.asyncIterator(boardCreated),
  },
};
