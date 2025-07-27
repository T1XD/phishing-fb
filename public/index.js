const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/submit', (req, res) => {
    const { email, pass } = req.body;
    const newAccount = { email, password: pass };

    fs.readFile('accs.json', (err, data) => {
        if (err) throw err;
        const accounts = JSON.parse(data);
        accounts.push(newAccount);
        fs.writeFile('accs.json', JSON.stringify(accounts, null, 2), (err) => {
            if (err) throw err;
            res.send('Account saved successfully!');
        });
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
