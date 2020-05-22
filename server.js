const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const authRouter = require('./auth/authRouter');
const userRouter = require('./users/userRouter');
const tripRouter = require('./trips/tripRouter');
const restricted = require('./auth/authenticate-middleware');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use('./api/auth', authRouter);
server.use('./api/users', restricted, userRouter);
server.use('./api/trips', restricted, tripRouter);

server.get('/', (req, res) => {
    res.send('<h1>Backend API for Trip Split</h1>');
});

module.exports = server;