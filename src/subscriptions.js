import { PubSub } from 'apollo-server-express';

const pubsub = new PubSub();
const notesUpdated = 'NOTES_UPDATED';
const noteCreated = 'NOTE_CREATED';
const boardCreated = 'BOARD_CREATED';
const noteDeleted = 'NOTE_DELETED';

export { pubsub, notesUpdated, noteCreated, boardCreated, noteDeleted };
