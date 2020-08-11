import { Board } from '../../model/collection';
import { dbService } from '../../services';

const Query = {
  getNotesByBoardId: async (_, { id }) => {
    console.log('::::::::::::::::;;getNotesByBoardId;::::::::::::::Request', id);
    const pipeline = [
      { $match: { id } },
      {
        $unwind: '$columns',
      },
      {
        $lookup: {
          from: 'Notes',
          localField: 'columns.id',
          foreignField: 'columnId',
          as: 'columns.notes',
        },
      },
      {
        $group: {
          _id: '$id',
          columns: { $push: '$columns' },
          id: { $first: '$id' },
          name: { $first: '$name' },
        },
      },
      {
        $project: {
          _id: 0,
          id: 1,
          name: 1,
          columns: 1,
        },
      },
    ];
    const result = await dbService.aggregate({ collection: Board, pipeline });
    console.log('::::::::::::::::getNotesByBoardId:::::::::::::::::Response', JSON.stringify(result[0]));
    // TODO: Response handling
    return result[0];
  },
};

export default Query;
