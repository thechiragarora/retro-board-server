import { pubsub, notesUpdated, noteCreated } from '../../subscriptions';

export default {
  notesUpdated: {
    subscribe: () => pubsub.asyncIterator(notesUpdated),
  },
  noteCreated: {
    subscribe: () => pubsub.asyncIterator(noteCreated),
  },
};
