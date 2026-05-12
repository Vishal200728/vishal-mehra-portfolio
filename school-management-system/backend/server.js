import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-memory storage
global.students = [];
global.teachers = [];
global.marks = [];

// ============ HEALTH CHECK ============
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// ============ STUDENT ROUTES (FIXED) ============

// Student Register
app.post('/api/students/register', async (req, res) => {
  try {
    console.log('📝 Student Register:', req.body);
    
    const { name, email, password, rollNo, class: studentClass } = req.body;
    
    if (!name || !email || !password || !rollNo) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    const existing = global.students.find(s => s.rollNo === String(rollNo) || s.email === email);
    if (existing) {
      return res.status(400).json({ message: 'Student already exists' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const student = {
      id: Date.now(),
      name,
      email,
      password: hashedPassword,
      rollNo: String(rollNo),
      class: studentClass || '10th'
    };
    global.students.push(student);
    
    console.log('✅ Student registered:', student.name, student.rollNo);
    
    res.status(201).json({
      message: 'Student registered successfully',
      student: { id: student.id, name: student.name, rollNo: student.rollNo, class: student.class }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Student Login
app.post('/api/students/login', async (req, res) => {
  try {
    console.log('🔐 Student Login:', req.body);
    
    const { rollNo, password } = req.body;
    
    if (!rollNo || !password) {
      return res.status(400).json({ message: 'Roll number and password required' });
    }
    
    const student = global.students.find(s => String(s.rollNo) === String(rollNo));
    
    if (!student) {
      return res.status(401).json({ message: 'Invalid roll number or password' });
    }
    
    const isValid = await bcrypt.compare(password, student.password);
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid roll number or password' });
    }
    
    const token = jwt.sign(
      { id: student.id, role: 'student', rollNo: student.rollNo, name: student.name },
      'secret123',
      { expiresIn: '7d' }
    );
    
    res.json({
      token,
      student: { id: student.id, name: student.name, rollNo: student.rollNo, class: student.class }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Student Marks
app.get('/api/students/marks/:rollNo', (req, res) => {
  const marks = global.marks.filter(m => m.rollNo === req.params.rollNo);
  res.json(marks);
});

// ============ TEACHER ROUTES (WORKING) ============

app.post('/api/teachers/register', async (req, res) => {
  try {
    const { name, email, password, subject, qualification, experience } = req.body;
    console.log('📝 Teacher Register:', { name, email, subject });
    
    const existing = global.teachers.find(t => t.email === email);
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
    global.teachers.push(teacher);
    
    res.status(201).json({ message: 'Teacher registered successfully', teacher });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/teachers/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('🔐 Teacher Login:', { email });
    
    const teacher = global.teachers.find(t => t.email === email);
    if (!teacher) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    const isValid = await bcrypt.compare(password, teacher.password);
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    const token = jwt.sign({ id: teacher.id, role: 'teacher', email: teacher.email }, 'secret123', { expiresIn: '7d' });
    
    res.json({
      token,
      teacher: { id: teacher.id, name: teacher.name, subject: teacher.subject }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/teachers/students', (req, res) => {
  const studentsList = global.students.map(s => ({ name: s.name, rollNo: s.rollNo, class: s.class }));
  res.json(studentsList);
});

app.post('/api/teachers/marks', (req, res) => {
  try {
    const { rollNo, physics, chemistry, mathematics, english, computer, examType } = req.body;
    
    const student = global.students.find(s => s.rollNo === rollNo);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    
    const total = Number(physics) + Number(chemistry) + Number(mathematics) + Number(english) + Number(computer);
    const percentage = (total / 500) * 100;
    
    const existingIndex = global.marks.findIndex(m => m.rollNo === rollNo && m.examType === examType);
    
    const markData = {
      id: Date.now(),
      rollNo,
      studentName: student.name,
      physics: Number(physics),
      chemistry: Number(chemistry),
      mathematics: Number(mathematics),
      english: Number(english),
      computer: Number(computer),
      examType: examType || 'Final',
      total,
      percentage
    };
    
    if (existingIndex !== -1) {
      global.marks[existingIndex] = markData;
    } else {
      global.marks.push(markData);
    }
    
    res.json({ message: 'Marks saved successfully', marks: markData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/teachers/marks', (req, res) => {
  res.json(global.marks);
});

// ============ ADMIN ROUTES ============

app.get('/api/admin/dashboard', (req, res) => {
  res.json({
    students: global.students,
    teachers: global.teachers,
    marks: global.marks,
    stats: {
      totalStudents: global.students.length,
      totalTeachers: global.teachers.length,
      totalExams: global.marks.length
    }
  });
});

app.delete('/api/admin/student/:id', (req, res) => {
  const id = parseInt(req.params.id);
  global.students = global.students.filter(s => s.id !== id);
  res.json({ message: 'Student deleted' });
});

app.delete('/api/admin/teacher/:id', (req, res) => {
  const id = parseInt(req.params.id);
  global.teachers = global.teachers.filter(t => t.id !== id);
  res.json({ message: 'Teacher deleted' });
});

// ============ START SERVER ============
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on http://localhost:${PORT}`);
  console.log(`✅ Student & Teacher APIs are ready!`);
  console.log(`📊 Total students: ${global.students.length}, Teachers: ${global.teachers.length}\n`);
});