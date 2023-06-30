const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/auth');
require('dotenv').config();

async function signup(req, res, next) {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findByUsername(username);
    if (existingUser) {
      return res.status(409).json({ error: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User(username, hashedPassword);
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  const { username, password } = req.body;

  try {
    const user = await User.findByUsername(username);
    if (!user) {
      return res.status(401).json({ error: 'Invalid username' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = jwt.sign({ id: user._id, username: user.username }, process.env.SECRET_KEY);
    res.json({ token });
  } catch (err) {
    next(err);
  }
}

module.exports = { signup, login };
