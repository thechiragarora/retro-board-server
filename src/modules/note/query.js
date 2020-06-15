import { Note } from '../../model/collection';
import { dbService } from '../../services';

const Query = {
  getNotesByBoardId: async (_, { input }) => {
    const result = await dbService.find({ collection: Note, data: { ...input } });
    // TODO: Response handling
    return result;
  },
};

export default Query;
