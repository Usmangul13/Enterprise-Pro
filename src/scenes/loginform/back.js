const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'username',
  password: 'password',
  database: 'Rakusensupdated'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to the database');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.query('SELECT * FROM Users WHERE Username = ?', [username], async (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).send('Internal Server Error');
    }

    if (results.length === 0) {
      return res.status(401).send('Invalid username or password');
    }

    const user = results[0];
    const match = await bcrypt.compare(password, user.Password);

    if (!match) {
      return res.status(401).send('Invalid username or password');
    }

    // Login successful
    return res.status(200).send('Login successful');
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

