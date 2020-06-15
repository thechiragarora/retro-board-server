/* eslint-disable no-param-reassign */
const transformResult = (doc, ret) => {
  ret.id = ret._id;
  delete ret._id;
  delete ret.__v;
};

export { transformResult };
