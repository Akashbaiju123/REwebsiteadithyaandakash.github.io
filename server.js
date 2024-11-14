// server.js
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware to parse JSON and form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MySQL database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',      // Change to your DB username
  password: 'root',      // Change to your DB password
  database: 'royal_enfield' // Change to your database name
});

// Connect to database
db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ', err);
    return;
  }
  console.log('Connected to MySQL database.');
});

// Endpoint to handle user sign-up
app.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
    
    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(query, [name, email, password], (err, result) => {
      if (err) {
        console.error('Error inserting user data: ', err);
        return res.json({ success: false, message: 'Error occurred while signing up.' });
      }
      
      // Assuming the result.insertId gives the user ID
      const userData = { id: result.insertId, name, email };
      
      res.json({ success: true, message: 'Sign up successful.', user: userData });
    });
  });
  
// Endpoint to handle user sign-in
app.post('/signin', (req, res) => {
    const { email, password } = req.body;
    
    const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
    db.query(query, [email, password], (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        const user = result[0];  // Assuming the first user found is the one signing in
        res.json({
          success: true,
          message: 'Sign in successful.',
          user: { id: user.id, name: user.name, email: user.email }  // Send user data
        });
      } else {
        res.json({ success: false, message: 'Invalid credentials.' });
      }
    });
  });
  

// Endpoint for forgot password (sending OTP)
app.post('/forgot-password', (req, res) => {
  const { email } = req.body;
  
  // Generate OTP (For simplicity, using a fixed value)
  const otp = Math.floor(100000 + Math.random() * 900000);
  
  // Here you would send the OTP to the user's email using a service like Nodemailer
  // For now, we just return the OTP as a response
  console.log(`OTP for ${email}: ${otp}`);
  res.json({ success: true, otp: otp });
});

// Endpoint for verifying OTP
app.post('/verify-otp', (req, res) => {
  const { otp } = req.body;
  
  // Here, you would compare the OTP with the one sent to the user's email
  // For simplicity, let's assume OTP verification is successful
  res.json({ success: true, message: 'OTP verified successfully.' });
});

// Endpoint to reset password
app.post('/reset-password', (req, res) => {
  const { email, newPassword } = req.body;
  
  const query = 'UPDATE users SET password = ? WHERE email = ?';
  db.query(query, [newPassword, email], (err, result) => {
    if (err) throw err;
    res.json({ success: true, message: 'Password reset successful.' });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

