import express from 'express';
import Student from '../models/Student.js';
import Teacher from '../models/Teacher.js';
import Mark from '../models/Mark.js';

const router = express.Router();

// Get all data
router.get('/dashboard', async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    const teachers = await Teacher.find().sort({ createdAt: -1 });
    const marks = await Mark.find().populate('studentId', 'name rollNo').sort({ createdAt: -1 });
    
    const stats = {
      totalStudents: students.length,
      totalTeachers: teachers.length,
      totalExams: marks.length,
      averagePercentage: marks.reduce((acc, m) => acc + (m.percentage || 0), 0) / (marks.length || 1)
    };
    
    res.json({ students, teachers, marks, stats });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete student
router.delete('/student/:id', async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    await Mark.deleteMany({ studentId: req.params.id });
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete teacher
router.delete('/teacher/:id', async (req, res) => {
  try {
    await Teacher.findByIdAndDelete(req.params.id);
    res.json({ message: 'Teacher deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete mark
router.delete('/mark/:id', async (req, res) => {
  try {
    await Mark.findByIdAndDelete(req.params.id);
    res.json({ message: 'Marks deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;