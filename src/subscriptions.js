import { PubSub } from 'apollo-server-express';

const pubsub = new PubSub();
const notesUpdated = 'NOTES_UPDATED';
const noteCreated = 'NOTE_CREATED';
const boardCreated = 'BOARD_CREATED';

export { pubsub, notesUpdated, noteCreated, boardCreated };
