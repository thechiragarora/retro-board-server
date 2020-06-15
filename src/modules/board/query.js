import Board from '../../model/collection';
import { dbService } from '../../services';

const Query = {
  getBoard: async (_, { input }) => {
    const result = await dbService.findOne({ collection: Board, data: { ...input } });
    // TODO: Response handling
    return result;
  },
};

export default Query;
