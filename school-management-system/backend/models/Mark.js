import mongoose from 'mongoose';

const markSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  studentName: {
    type: String,
    required: true
  },
  physics: {
    type: Number,
    min: 0,
    max: 100
  },
  chemistry: {
    type: Number,
    min: 0,
    max: 100
  },
  mathematics: {
    type: Number,
    min: 0,
    max: 100
  },
  english: {
    type: Number,
    min: 0,
    max: 100
  },
  computer: {
    type: Number,
    min: 0,
    max: 100
  },
  total: Number,
  percentage: Number,
  grade: String,
  examType: {
    type: String,
    default: 'Final'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Calculate total, percentage and grade before saving
markSchema.pre('save', function(next) {
  this.total = (this.physics || 0) + (this.chemistry || 0) + (this.mathematics || 0) + (this.english || 0) + (this.computer || 0);
  this.percentage = (this.total / 500) * 100;
  
  if (this.percentage >= 90) this.grade = 'A+';
  else if (this.percentage >= 80) this.grade = 'A';
  else if (this.percentage >= 70) this.grade = 'B+';
  else if (this.percentage >= 60) this.grade = 'B';
  else if (this.percentage >= 50) this.grade = 'C';
  else if (this.percentage >= 40) this.grade = 'D';
  else this.grade = 'F';
  
  next();
});

export default mongoose.model('Mark', markSchema);