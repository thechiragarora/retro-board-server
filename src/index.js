import path from 'path';
import * as modules from './modules';
import { loadGQLFiles, mergeResolvers } from './lib';

const typeDefs = loadGQLFiles(path.resolve(__dirname, './**/*.graphql'));
const resolvers = mergeResolvers(modules);
export {
  typeDefs,
  resolvers,
};
