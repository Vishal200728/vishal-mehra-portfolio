import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  subject: { 
    type: String, 
    required: true 
  },
  qualification: { 
    type: String, 
    default: '' 
  },
  experience: { 
    type: Number, 
    default: 0 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

export default mongoose.model('Teacher', teacherSchema);