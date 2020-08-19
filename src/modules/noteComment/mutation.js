import { NoteComment } from '../../model/collection';
import { dbService } from '../../services';

const Mutation = {
  createNoteComment: async (_, { input }) => {
    try {
      console.log('::::::::::::::createNoteComment::::::::::::Request', input);
      const result = await dbService.create({ collection: NoteComment, data: { ...input } });
      // TODO: Response handling
      return result;
    } catch (err) {
      console.log('eeeeeeeerrrrrrrrrrrrrrrrrrrr', err);
    }
  },
};

export default Mutation;
