class DBOperation {
  count = async ({collection, data = {}}) => {
    try {
      return await collection.countDocuments(data);
    } catch (err) {
      return { error: err.message };
    }
  }

  create = async ({collection, data = {}}) => {
    try {
      return await collection.create(data);
    } catch (err) {
      return { error: err.message };
    }
  }

  findOne = async ({collection, data = {}, projection = {}}) => {
    try {
      return await collection.findOne(data, projection);
    } catch (err) {
      return { error: err.message };
    }
  }

  updateOne = async ({ collection, dataToUpdate, criteria }) => {
    try {
      return await collection.updateOne(criteria, { $set: dataToUpdate });
    } catch (err) {
      return { error: err.message };
    }
  }

  // Note: use findOneAndUpdate only when require updated data in return, else use updateOne which is faster one.
  findOneAndUpdate = async ({ collection, dataToUpdate, criteria }) => {
    try {
      return await collection.findOneAndUpdate(criteria, dataToUpdate, { new: true, useFindAndModify: false });
    } catch (err) {
      return { error: err.message };
    }
  }

  updateMany = async ({ collection, dataToUpdate, criteria }) => {
    try {
      return await collection.updateMany(criteria, { $set: dataToUpdate });
    } catch (err) {
      return { error: err.message };
    }
  }

  find = async ({
    collection, data = {}, skip = 0, limit = 0, projection = {},
  }) => {
    try {
      return await collection.find(data, projection).skip(skip).limit(limit);
    } catch (err) {
      return { error: err.message };
    }
  }

  deleteMany = async ({collection, data}) => {
    try {
      return await collection.deleteMany(data);
    } catch (err) {
      return { error: err.message };
    }
  }

  deleteOne = async ({collection, data}) => {
    try {
      return await collection.deleteOne(data);
    } catch (err) {
      return { error: err.message };
    }
  }

  aggregate = async ({collection, pipeline}) => {
    try {
      return await collection.aggregate(pipeline);
    } catch (err) {
      return { error: err.message };
    }
  }
}

export default new DBOperation();
