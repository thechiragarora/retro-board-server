import { Board } from '../../model/collection';
import { dbService } from '../../services';

const Query = {
  getBoard: async (_, { input }) => {
    // handle latter format of req.request
    const result = await dbService.findOne({ collection: Board, data: { ...input } });
    return result;
  },
  getBoards: async (_, { input }) => {
    const result = await dbService.find({ collection: Board, data: { ...input } });
    return result;
  },
};

export default Query;
