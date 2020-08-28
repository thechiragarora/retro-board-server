import mongoose from 'mongoose';

const {
  Schema,
} = mongoose;

const userSchema = new Schema({
  id: {
    type: String,
    unique: true,
  },
  googleId: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: false,
  },
}, {
  collection: 'Users',
  timestamps: true,
  versionKey: false,
});

// userSchema pre save hook
userSchema.pre('save', function preSave() {
  const user = this;
  user.id = user._id.toString();
});

const User = mongoose.model('User', userSchema);

export default User;
