import mongoose from 'mongoose';

const {
  Schema,
} = mongoose;

const columnSchema = new Schema({
  id: { type: String, unique: true },
  name: { type: String, required: true },
});

// columnSchema pre save hook
columnSchema.pre('save', function preSave() {
  const column = this;
  column.id = column._id.toString();
});

const boardSchema = new Schema({
  id: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  columns: [columnSchema],
  status: {
    type: String,
    enum: ['active', 'locked', 'archived'],
    default: 'active',
    required: true,
  },
  type: {
    type: String,
    enum: ['custom', 'template'],
  },
}, {
  collection: 'Boards',
  timestamps: true,
  versionKey: false,
});

// boardSchema pre save hook
boardSchema.pre('save', function preSave() {
  const board = this;
  board.id = board._id.toString();
});

const Board = mongoose.model('Board', boardSchema);

export default Board;
