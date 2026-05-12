import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  rollNo: {
    type: String,
    unique: true
  },
  class: {
    type: String,
    default: '10th'
  },
  image: {
    url: String,
    publicId: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Student', studentSchema);