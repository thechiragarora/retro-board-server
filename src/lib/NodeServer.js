import bodyParser from 'body-parser';
import compress from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { createServer } from 'http';
import Express from 'express';
import helmet from 'helmet';
import methodOverride from 'method-override';
import { ApolloServer } from 'apollo-server-express';
import db from '../db';

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

    return this;
  }

  /**
   *
   * @returns -Instance of Current Object
   */
  async run() {
    const { port, env } = this.config;
    try {
      await db.open();
      console.log('Db connected successfully');
      await this.app.listen(port, () => {
        console.info(`server started on port ${port} (${env})`); // eslint-disable-line no-console
      });
    } catch (err) {
      console.warn(err);
    }
    return this;
  }

  async setupApollo(data, typeDefs) {
    const { app } = this;

    this.server = new ApolloServer({
      ...data,
      typeDefs,
      context: ({ req }) => ({
        request: req,
      }),
      onHealthCheck: () => new Promise((resolve) => {
        resolve('I am OK');
      }),
    });

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
}
