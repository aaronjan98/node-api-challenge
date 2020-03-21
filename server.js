const express = require('express');

const actionsRouter = require('./routers/actionsRouter.js');
const projectsRouter = require('./routers/projectsRouter');

const cors = require ("cors");
const server = express();

server.use(cors());
server.use(express.json());
server.use(logger);

server.use('/actions', actionsRouter);
server.use('/projects', projectsRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Hello World!</h2>`);
});


//custom middleware

function logger(req, res, next) {
  console.log(`${req.method} request to ${req.originalUrl}. \n${new Date()}`);
  next();
}


module.exports = server;
