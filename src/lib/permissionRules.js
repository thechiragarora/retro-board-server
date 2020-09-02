/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import { rule } from 'graphql-shield';
import passport from 'passport';
import { Note } from '../model/collection';
import passportConfig from '../config/passport';
import { dbService } from '../services';

const authenticate = (req, res) => new Promise((resolve, reject) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err || info !== undefined) req.isAuth = false;
    else if (!user) reject(new Error('Not authenticated'));
    else if (user) {
      req.user = user;
      req.isAuth = true;
    }
    resolve(user);
  })(req, res);
});

const isAuthenticated = rule()(
  async (_, args, { req, res, userCredentials }) => {
    await authenticate(req, res);
    console.log('isValiddddd', req.isAuth)
    const isValid = req.isAuth;
    console.log('isValid', isValid)
    return isValid;
  },
);
const isAdmin = rule()(async (_, args, { req }) => {
  // req.user.role === 'admin'
  return true;
});

const isUser = rule()(async (_, args, { req }) => {
  // req.user.role === 'user'
  return true;
});

const isAnonymous = rule()(
  async (_, args, { req }) => req.user.role === 'anonymous',
);

const isUserDeleteNote = rule()(
  //* will update later
  async (_, args, { req }) => {
    // if (req.user.role !== 'user') return false;
    // const result = await dbService.find({
    //   collection: Note,
    //   data: { user: req.user.id },
    // });
    return true;
  },
);

const isAnonymousDeleteNote = rule()(
  //* will update later
  async (_, args, { req }) => {
    // if (req.user.role !== 'anonymous') return false;
    // const result = await dbService.find({
    //   collection: Note,
    //   data: { user: req.user.id },
    // });
    return true;
  },
);

const isUserUpdateNote = rule()(
  //* will update later
  async (_, args, { req }) => {
    // if (req.user.role !== 'user') return false;
    // const result = await dbService.find({
    //   collection: Note,
    //   data: { user: req.user.id },
    // });
    return true;
  },
);

const isAnonymousUpdateNote = rule()(
  //* will update later
  async (_, args, { req }) => {
    // if (req.user.role !== 'anonymous') return false;
    // const result = await dbService.find({
    //   collection: Note,
    //   data: { user: req.user.id },
    // });
    return true;
  },
);

export {
  isAuthenticated,
  isAdmin,
  isUser,
  isAnonymous,
  isUserDeleteNote,
  isAnonymousDeleteNote,
  isAnonymousUpdateNote,
  isUserUpdateNote,
};
