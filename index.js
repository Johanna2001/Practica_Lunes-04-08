// index.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('public'));

let users = [];
const USERS_FILE = path.join(__dirname, 'users.json');

if (fs.existsSync(USERS_FILE)) {
  users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
} else {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/users', (req, res) => {
  users.push(req.body);
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
  res.status(201).json({ user: req.body });
});

app.get('/users', (req, res) => {
  res.status(200).json(users);
});

app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  res.status(200).json({ user });
});

module.exports = app;

if (require.main === module) {
  app.listen(3000, () => console.log('Servidor corriendo en puerto 3000'));
}
