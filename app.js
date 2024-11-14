const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3306;

// Enable CORS
app.use(cors());

// Middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MySQL database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Your MySQL username
  password: 'root', // Your MySQL password
  database: 'royal_enfield'
});

db.connect((err) => {
  if (err) {
    console.log('Error connecting to MySQL database:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Route to handle form submission
app.post('/save-contact', (req, res) => {
  const { name, email, phone, message } = req.body;

  // Insert the contact form data into the database
  const query = 'INSERT INTO contact_form (name, email, phone, message) VALUES (?, ?, ?, ?)';
  db.query(query, [name, email, phone, message], (err, result) => {
    if (err) {
      console.error('Error saving contact form data:', err);
      return res.status(500).send('Error saving data');
    }
    res.status(200).send('Message Sent!');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
