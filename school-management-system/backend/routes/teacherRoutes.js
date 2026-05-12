import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import Teacher from '../models/Teacher.js';

const router = express.Router();

// Register Teacher
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, subject, qualification, experience } = req.body;
    
    console.log('📝 Teacher Registration Request:', { name, email, subject });
    
    // Check if MongoDB is connected
    if (mongoose.connection.readyState === 1) {
      // Use Database
      const existing = await Teacher.findOne({ email });
      if (existing) {
        return res.status(400).json({ message: 'Teacher already exists with this email' });
      }
      
      const hashedPassword = await bcrypt.hash(password, 10);
      const teacher = await Teacher.create({
        name,
        email,
        password: hashedPassword,
        subject,
        qualification: qualification || '',
        experience: experience || 0
      });
      
      console.log('✅ Teacher registered in DB:', teacher.name);
      res.status(201).json({ message: 'Teacher registered successfully', teacher });
    } else {
      // Use In-Memory Storage
      const existing = global.teachers?.find(t => t.email === email);
      if (existing) {
        return res.status(400).json({ message: 'Teacher already exists' });
      }
      
      const hashedPassword = await bcrypt.hash(password, 10);
      const teacher = {
        id: Date.now(),
        name,
        email,
        password: hashedPassword,
        subject,
        qualification: qualification || '',
        experience: experience || 0
      };
      
      if (!global.teachers) global.teachers = [];
      global.teachers.push(teacher);
      
      console.log('✅ Teacher registered in memory:', teacher.name);
      res.status(201).json({ message: 'Teacher registered successfully (Offline Mode)', teacher });
    }
  } catch (error) {
    console.error('❌ Teacher Registration Error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Login Teacher
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log('🔐 Teacher Login Request:', { email });
    
    if (mongoose.connection.readyState === 1) {
      const teacher = await Teacher.findOne({ email });
      if (!teacher) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      
      const isValid = await bcrypt.compare(password, teacher.password);
      if (!isValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      
      const token = jwt.sign(
        { id: teacher._id, role: 'teacher', email: teacher.email },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );
      
      res.json({
        token,
        teacher: { id: teacher._id, name: teacher.name, subject: teacher.subject }
      });
    } else {
      const teacher = global.teachers?.find(t => t.email === email);
      if (!teacher) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      
      const isValid = await bcrypt.compare(password, teacher.password);
      if (!isValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      
      const token = jwt.sign(
        { id: teacher.id, role: 'teacher', email: teacher.email },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );
      
      res.json({
        token,
        teacher: { id: teacher.id, name: teacher.name, subject: teacher.subject }
      });
    }
  } catch (error) {
    console.error('❌ Teacher Login Error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get all students (for dropdown)
router.get('/students', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const Student = await import('../models/Student.js').then(m => m.default);
      const students = await Student.find().select('name rollNo class');
      res.json(students);
    } else {
      res.json(global.students || []);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Save Marks
router.post('/marks', async (req, res) => {
  try {
    const { rollNo, physics, chemistry, mathematics, english, computer, examType } = req.body;
    
    console.log('📝 Save Marks Request:', { rollNo, examType });
    
    if (mongoose.connection.readyState === 1) {
      const Student = await import('../models/Student.js').then(m => m.default);
      const Mark = await import('../models/Mark.js').then(m => m.default);
      
      const student = await Student.findOne({ rollNo });
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
      
      let marks = await Mark.findOne({ rollNo, examType });
      
      if (marks) {
        marks.physics = physics;
        marks.chemistry = chemistry;
        marks.mathematics = mathematics;
        marks.english = english;
        marks.computer = computer;
      } else {
        marks = new Mark({
          studentId: student._id,
          studentName: student.name,
          rollNo,
          physics: Number(physics),
          chemistry: Number(chemistry),
          mathematics: Number(mathematics),
          english: Number(english),
          computer: Number(computer),
          examType
        });
      }
      
      await marks.save();
      res.json({ message: 'Marks saved successfully', marks });
    } else {
      if (!global.marks) global.marks = [];
      const existingIndex = global.marks.findIndex(m => m.rollNo === rollNo && m.examType === examType);
      
      const markData = {
        id: Date.now(),
        rollNo,
        physics: Number(physics),
        chemistry: Number(chemistry),
        mathematics: Number(mathematics),
        english: Number(english),
        computer: Number(computer),
        examType,
        total: Number(physics) + Number(chemistry) + Number(mathematics) + Number(english) + Number(computer),
        percentage: ((Number(physics) + Number(chemistry) + Number(mathematics) + Number(english) + Number(computer)) / 500) * 100
      };
      
      if (existingIndex !== -1) {
        global.marks[existingIndex] = markData;
      } else {
        global.marks.push(markData);
      }
      
      res.json({ message: 'Marks saved successfully (Offline Mode)', marks: markData });
    }
  } catch (error) {
    console.error('❌ Save Marks Error:', error);
    res.status(500).json({ message: error.message });
  }
});

export default router;