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

  updateOne = async ({collection, filter, dataToUpdate}) => {
    try {
      return await collection.updateOne(filter, { $set: dataToUpdate });
    } catch (err) {
      return { error: err.message };
    }
  }

}

export default new DBOperation();
