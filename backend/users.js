import mysql from 'mysql2';

// Create DB connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'auth',
  password: 'Ahmed@1234',
  database: 'farmcycle'
});

// Connect and create users table
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');

  const sql = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL
    )
  `;

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log('Users table created or already exists.');
    db.end(); // close connection
  });
});
