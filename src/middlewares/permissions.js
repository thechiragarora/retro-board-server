import { shield, or, chain } from 'graphql-shield';
import {
  isAuthenticated,
  isAdmin,
  isUser,
  isAnonymous,
  isUserUpdateNote,
  isUserDeleteNote,
  isAnonymousUpdateNote,
  isAnonymousDeleteNote,
} from '../lib/permissionRules';

const permissions = shield({
  Query: {
    getBoards: isAuthenticated,
    getBoard: chain(isAuthenticated, isAdmin),
    getNotesByBoardId: chain(isAuthenticated, isAdmin),
  },
  Mutation: {
    createBoard: chain(isAuthenticated, or(isUser, isAdmin)),
    createNote: chain(isAuthenticated, or(isAdmin, isUser, isAnonymous)),
    deleteNote: chain(
      isAuthenticated,
      or(isAdmin, isUserDeleteNote, isAnonymousDeleteNote),
    ),
    deleteBoard: chain(isAuthenticated, isAdmin),
    updateNote: chain(
      isAuthenticated,
      or(isAdmin, isUserUpdateNote, isAnonymousUpdateNote),
    ),
  },
});

export default permissions;
