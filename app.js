const express = require("express");
const path = require("path");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { createUser, findUser } = require('./users');

const JWT_SECRET = 'mySecretWord'
const JWT_EXPIRES = 60*60*24

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  console.log(`[${req.method}]: ${req.url}`);
  next();
});

/* Запуск сервера */
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
});

app.get("/api/auth", (req, res) => {
  res.json({auth: true});
});

// app.post("/api/auth", (req, res) => {
//   const { username, password } = req.body;

//   if (!username || !password) {
//     return res.status(400).json({ error: "-" });
//   }

//   const newUser = {
//     id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
//     username,
//     password
//   };

//   users.push(newUser);
//   res.status(201).json({ message: "user was succesfully added", user: newUser });
// });

//r
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body
  if (await findUser(username))
    return res.status(400).json({ message: "User already exists" })
 
  await createUser(username, password)
  res.json({ message: "User registered" })
})

//l
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body
  const user = await findUser(username)
  if (!user) return res.status(401).json({ message: 'Invalid credentials' })
 
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: 'Invalid credentials' })
 
  const token = jwt.sign(
    { username },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES }
  )
 
  res.json({ token })
})

//p
app.get('/api/profile', authMiddleware, (req, res) => {
  res.json({ message: `Hello, ${req.user.username}!` })
})
function authMiddleware(req, res, next) { 
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) return res.sendStatus(401)
 
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}