const express = require('express');
const server = express();
const port = 5000;

// Middleware to parse JSON request bodies
server.use(express.json());

const items = [
    { id: 1, Name: 'ADITHYA' },
    { id: 2, Name: 'VERIZON' },
    { id: 3, Name: 'ADITHYA' }
];

// Routes
server.get('/', (req, res) => {
    res.end("I Am Dr Strange");
});

server.get('/Saran', (req, res) => {
    res.end("Hello Peter");
});

server.get('/PRO', (req, res) => {
    res.json(items);
});

server.post('/PRO', (req, res) => {
    // Ensure `name` is sent in the body
    const newItem = { id: items.length + 1, Name: req.body.name };
    items.push(newItem);
    res.status(201).json(newItem);
});

// Start the server
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
