import '@babel/polyfill';
// config should be imported before importing any other file
import config from './config/configurations';
import Server from './lib/NodeServer';
import { resolvers, typeDefs } from '.';
import logging from './config/logging';

const server = new Server(config);

const initServer = async () => {
  server.bootstrap()
    .setupApollo({
      resolvers,
      plugins: [logging],
    }, typeDefs);
};

initServer();


export default server;
