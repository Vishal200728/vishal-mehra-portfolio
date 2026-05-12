import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Student from '../models/Student.js';
import Mark from '../models/Mark.js';

const router = express.Router();

// Student Registration
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, rollNo, class: studentClass } = req.body;
    
    // Check if student exists
    const existingStudent = await Student.findOne({ $or: [{ email }, { rollNo }] });
    if (existingStudent) {
      return res.status(400).json({ message: 'Student already exists' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const student = new Student({
      name,
      email,
      password: hashedPassword,
      rollNo,
      class: studentClass
    });
    
    await student.save();
    
    res.status(201).json({ message: 'Student registered successfully', student });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Student Login
router.post('/login', async (req, res) => {
  try {
    const { rollNo, password } = req.body;
    
    const student = await Student.findOne({ rollNo });
    if (!student) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const isValid = await bcrypt.compare(password, student.password);
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { id: student._id, role: 'student', rollNo: student.rollNo },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.json({
      message: 'Login successful',
      token,
      student: {
        id: student._id,
        name: student.name,
        rollNo: student.rollNo,
        class: student.class
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Student Marks
router.get('/marks/:rollNo', async (req, res) => {
  try {
    const student = await Student.findOne({ rollNo: req.params.rollNo });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    
    const marks = await Mark.find({ studentId: student._id });
    res.json({ student, marks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;