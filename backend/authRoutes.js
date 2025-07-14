import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mysql from 'mysql2';

const router = express.Router();

// DB connection
const db = mysql.createPool({ 
  host: 'localhost',
  user: 'auth',
  password: 'Ahmed@1234',
  database: 'farmcycle'
});

// Signup
router.post('/signup', (req, res) => {
  const { name, email, password } = req.body;

  // Hash password
  const hashedPassword = bcrypt.hashSync(password, 10);
  const role = 'buyer';


  const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  db.query(sql, [name, email, hashedPassword, role], (err, result) => {
    if (err) return res.status(500).json({ error: 'User already exists or error' });
    res.json({ message: 'Signup successful' });
  });
});

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], (err, results) => {
    if (err || results.length === 0) return res.status(401).json({ error: 'User not found' });

    const user = results[0];
    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) return res.status(401).json({ error: 'Invalid password' });

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, 'SECRET_KEY',
      { expiresIn: '1h' }

    );
    res.json({ message: 'Login successful', token, role:user.role });
  });
});

export default router;
