const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

// Serve the thank you page
app.get('/thankyou.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'thankyou.html'));
});

app.post('/register', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }
    console.log(`Registering user: ${username}`);

    res.status(200).json({ message: 'User registered successfully!' });
});

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
