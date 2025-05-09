// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data.json');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Save form data to file
app.post('/submit-form', (req, res) => {
    const newData = req.body;
    let existingData = [];

    if (fs.existsSync(DATA_FILE)) {
        const fileData = fs.readFileSync(DATA_FILE);
        existingData = JSON.parse(fileData);
    }

    existingData.push(newData);
    fs.writeFileSync(DATA_FILE, JSON.stringify(existingData, null, 2));
    res.redirect('/success.html');
});

// View data
app.get('/view-data', (req, res) => {
    if (!fs.existsSync(DATA_FILE)) {
        return res.send('<h2>No data available yet.</h2>');
    }

    const fileData = fs.readFileSync(DATA_FILE);
    const data = JSON.parse(fileData);

    let html = '<h1>Submitted Data</h1><ul>';
    data.forEach(entry => {
        html += `<li>${JSON.stringify(entry)}</li>`;
    });
    html += '</ul>';
    res.send(html);
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
