import mongoose from 'mongoose';

const {
  Schema,
} = mongoose;

const commentSchema = new Schema({
  id: {
    type: String,
    unique: true,
  },
  noteId: {
    type: String,
    required: true,
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
  collection: 'NoteComment',
  timestamps: true,
});

// commentSchema pre save hook
commentSchema.pre('save', function preSave() {
  const comment = this;
  comment.id = comment._id.toString();
});

const NoteComment = mongoose.model('NoteComment', commentSchema);

export default NoteComment;
