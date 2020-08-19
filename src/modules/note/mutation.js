import { Note } from '../../model/collection';
import { dbService } from '../../services';
import { pubsub, notesUpdated, noteCreated, noteDeleted } from '../../subscriptions';

const Mutation = {
  createNote: async (_, { input }) => {
    console.log('::::::::::::::createNote::::::::::::Request', input);
    const result = await dbService.create({ collection: Note, data: { ...input } });
    console.log('::::::::::::::::createNote:::::::::::::Response', result);
    pubsub.publish(noteCreated, { noteCreated: result });

    // TODO: Response handling
    return result;
  },
  // createNoteComment: async (_, { input }) => {
  //   console.log('::::::::::::::createNoteComment::::::::::::Request', input)
  //   const result = await dbService.create({ collection: Note, data: { ...input } });
  //   // TODO: Response handling
  //   return result;
  // },
  updateNote: async (_, { input }) => {
    console.log('::::::::::::::updateNote::::::::::::Request', input);
    const { id, ...rest } = input;
    const result = await dbService.findOneAndUpdate({
      collection: Note, criteria: { id }, dataToUpdate: { ...rest },
    });
    pubsub.publish(notesUpdated, { notesUpdated: result });
    console.log('::::::::::::::::updateNote:::::::::::::Response', result);
    // TODO: Response handling
    if (result) {
      return 'Note updated successfully';
    }
  },
  deleteNote: async (_, { id }) => {
    console.log('::::::::::::::::::::deleteNote:::::::::Request', id);
    const result = await dbService.findOneAndRemove({
      collection: Note, data: { id },
    });
    pubsub.publish(noteDeleted, { noteDeleted: result });
    console.log('::::::::::::::::deleteNote:::::::::::::Response', result);
    const { n } = result;
    if (n) {
      return 'Note deleted successfully';
    }
  },
};

export default Mutation;
