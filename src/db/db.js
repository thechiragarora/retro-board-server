import { connect, disconnect } from 'mongoose';
import { LOCAL_MONGO_URL } from '../constants';

const { MONGO_URL } = process.env;

const db = {
  url: MONGO_URL || LOCAL_MONGO_URL,
  options: {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
};

const open = () => connect(db.url, db.options);
const close = () => disconnect(db.url, db.options);

export default {
  open,
  close,
};
