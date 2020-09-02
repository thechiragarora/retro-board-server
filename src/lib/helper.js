/* eslint-disable import/prefer-default-export */
import { resolvers } from '..';

const createDynamicMiddleware = (middleware) => {
  const middlewareWrapper = {
    Query: {},
    Mutation: {},
  };
  Object.keys(middlewareWrapper).forEach((resolverType) => {
    Object.keys(resolvers[resolverType]).forEach((resolverName) => {
      middlewareWrapper[resolverType][resolverName] = middleware;
    });
  });
  return middlewareWrapper;
};

export { createDynamicMiddleware };
