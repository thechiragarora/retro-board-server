import { NoteComment } from '../../model/collection';
import { dbService } from '../../services';

const Query = {
  getNoteComment: async (_, { input }) => {
    const result = await dbService.findOne({ collection: NoteComment, data: { ...input } });
    // TODO: Response handling
    return result;
  },
  getNoteComments: async (_, { input }) => {
    const result = await dbService.find({ collection: NoteComment, data: { ...input } });
    // TODO: Response handling
    return result;
  },
};
export default Query;
