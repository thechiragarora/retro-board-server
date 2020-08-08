import { Board } from '../../model/collection';
import { dbService } from '../../services';

const Mutation = {
  createBoard: async (_, { input }) => {
    const { name, columns, type } = input;
    let columnData = [...columns];
    columnData = columnData.map(column => ({ name: column }));
    const result = await dbService.create({
      collection: Board,
      data: { name, columns: columnData, type },
    });
    // TODO: Response handling
    return result;
  },
};

export default Mutation;
