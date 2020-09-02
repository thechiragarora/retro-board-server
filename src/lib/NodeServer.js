import bodyParser from 'body-parser';
import compress from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { createServer } from 'http';
import Express from 'express';
import helmet from 'helmet';
import methodOverride from 'method-override';
import { ApolloServer } from 'apollo-server-express';
import passport from 'passport';
import { makeExecutableSchema } from 'graphql-tools';
import { applyMiddleware } from 'graphql-middleware';
import db from '../config/db';
// import authMiddleWare from './authMiddleWare';
import authRoutes from '../config/auth-routes';
import { permissions, responseHandler } from '../middlewares';

export default class Server {
  constructor(config) {
    this.config = config;
    this.app = new Express();
    this.run = this.run.bind(this);
  }

  get application() {
    return this.app;
  }

  /**
   * To enable all the setting on our express app
   * @returns -Instance of Current Object
   */
  bootstrap() {
    this._initHelmet();
    this._initCompress();
    this._initCookieParser();
    this._initCors();
    this._initJsonParser();
    this._initMethodOverride();
    this._initPassport();

    return this;
  }

  /**
   *
   * @returns -Instance of Current Object
   */
  async run() {
    const { port } = this.config;
    try {
      await db.open();
      console.log('Db connected successfully');
      await this.httpServer.listen(port, () => {
        console.log(`🚀 Server ready at http://localhost:${port}${this.server.graphqlPath}`);
        console.log(`🚀 Subscriptions ready at ws://localhost:${port}${this.server.subscriptionsPath}`);
      });
    } catch (err) {
      console.warn(err);
    }
    return this;
  }

  async setupApollo(data, typeDefs) {
    const middleware = [permissions, responseHandler];
    const schema = makeExecutableSchema({ typeDefs, ...data });
    const schemaWithMiddleware = applyMiddleware(schema, ...middleware);

    const { app } = this;
    this.server = new ApolloServer({
      schema: schemaWithMiddleware,
      context: ({ req, res }) => ({
        res, req,
      }),
      // onHealthCheck: () => new Promise((resolve) => {
      //   resolve('I am OK');
      // }),
    });
    this.app.use('/auth', authRoutes);
    this.server.applyMiddleware({ app });
    this.httpServer = createServer(app);
    this.server.installSubscriptionHandlers(this.httpServer);
    this.run();
  }

  /**
   * Compression of the output
   */
  _initCompress() {
    this.app.use(compress());
  }

  /**
   * Parse Cookie header and populate req.cookies with an object keyed by the cookie names
   */
  _initCookieParser() {
    this.app.use(cookieParser());
  }

  /**
   *
   * Lets you to enable cors
   */
  _initCors() {
    this.app.use(cors());
  }

  /**
   *
   * Helmet helps you secure your Express apps by setting various HTTP headers.
   */
  _initHelmet() {
    this.app.use(helmet());
  }

  /**
   *  - Parses urlencoded bodies & JSON
   */
  _initJsonParser() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  /**
   *
   * Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
   */
  _initMethodOverride() {
    this.app.use(methodOverride());
  }

  _initPassport() {
    this.app.use(passport.initialize());
  }
}
