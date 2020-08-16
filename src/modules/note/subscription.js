import { withFilter } from 'apollo-server-express';
import { pubsub, notesUpdated, noteCreated } from '../../subscriptions';

export default {
  notesUpdated: {
    subscribe: withFilter(
      () => pubsub.asyncIterator(notesUpdated),
      (payload, { columnId }) => {
        const { notesUpdated: { columnId: payloadColumnId } } = payload;
        return payloadColumnId === columnId;
      },
    ),
  },
  noteCreated: {
    subscribe: withFilter(
      () => pubsub.asyncIterator(noteCreated),
      (payload, { columnId }) => {
        const { noteCreated: { columnId: payloadColumnId } } = payload;
        return payloadColumnId === columnId;
      },
    ),
  },
};
