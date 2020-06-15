import { Note } from '../../model/collection';
import { dbService } from '../../services';

const Mutation = {
  createNote: async (_, { input }) => {
    const result = await dbService.create({ collection: Note, data: { ...input } });
    // TODO: Response handling
    return result;
  },
};

export default Mutation;
