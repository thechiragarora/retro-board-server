import { Note } from '../../model/collection';
import { dbService } from '../../services';
import {
  pubsub, notesUpdated, noteCreated, noteDeleted,
} from '../../subscriptions';

const Mutation = {
  createNote: async (_, { input }, req) => {
    const result = await dbService.create({ collection: Note, data: { ...input, userId: req.user.id } });
    pubsub.publish(noteCreated, { noteCreated: result });

    return result;
  },
  updateNote: async (_, { input }) => {
    const { id, ...rest } = input;
    const result = await dbService.findOneAndUpdate({
      collection: Note, criteria: { id }, dataToUpdate: { ...rest },
    });
    pubsub.publish(notesUpdated, { notesUpdated: result });
    // TODO: Response handling
    if (result) {
      return 'Note updated successfully';
    }
  },
  deleteNote: async (_, { id }) => {
    const result = await dbService.findOneAndRemove({
      collection: Note, data: { id },
    });
    pubsub.publish(noteDeleted, { noteDeleted: result });
    const { n } = result;
    if (n) {
      return 'Note deleted successfully';
    }
  },
};

export default Mutation;
