import { pubsub, notesUpdated, noteCreated, noteDeleted } from '../../subscriptions';

export default {
  notesUpdated: {
    subscribe: () => pubsub.asyncIterator(notesUpdated),
  },
  noteCreated: {
    subscribe: () => pubsub.asyncIterator(noteCreated),
  },
  noteDeleted: {
    subscribe: () => pubsub.asyncIterator(noteDeleted),
  },
};
