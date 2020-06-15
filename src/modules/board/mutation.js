import { Board } from '../../model/collection';
import { dbService } from '../../services';

const Mutation = {
  createBoard: async (_, { input }) => {
    const { name, columns } = input;
    let columnData = [...columns];
    columnData = columnData.map(column => ({ name: column }));
    const result = await dbService.create({ collection: Board, data: { name, columns: columnData } });
    // TODO: Response handling
    return result;
  },
};

export default Mutation;
