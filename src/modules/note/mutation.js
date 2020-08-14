import { Note } from '../../model/collection';
import { dbService } from '../../services';

const Mutation = {
  createNote: async (_, { input }) => {
    const result = await dbService.create({ collection: Note, data: { ...input } });
    // TODO: Response handling
    return result;
  },
  updateNote: async (_, { input }) => {
    console.log('::::::::::::::updateNote::::::::::::Request', input)
    const { id, ...rest } = input;
    const result = await dbService.updateOne({
      collection: Note, criteria: { id }, dataToUpdate: { ...rest },
    });
    console.log('::::::::::::::::updateNote:::::::::::::Response', result);
    // TODO: Response handling
    if (result) {
      return 'Note updated successfully';
    }
  },
};

export default Mutation;
