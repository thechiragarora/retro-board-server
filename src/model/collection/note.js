import mongoose from 'mongoose';

const {
  Schema,
} = mongoose;

const noteSchema = new Schema({
  id: {
    type: String,
    unique: true,
  },
  columnId: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: false,
  },
  likes: {
    type: Number,
    required: true,
    default: 0,
  },
  dislikes: {
    type: Number,
    required: true,
    default: 0,
  },
  reply: {
    type: String,
    required: false,
  },
  color: {
    type: String,
    required: false,
  },
  user: {
    type: String,
    default: 'Anonymous',
    required: false,
  },
}, {
  collection: 'Notes',
  timestamps: true,
});

// noteSchema pre save hook
noteSchema.pre('save', function preSave() {
  const note = this;
  note.id = note._id.toString();
});

const Note = mongoose.model('Note', noteSchema);

export default Note;
