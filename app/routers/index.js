const routers = require('express').Router();

const projects = require('./projects');
routers.use('/projects', projects);
const tasks = require('./tasks');
routers.use('/tasks', tasks);
const users = require('./users');
routers.use('/users', users);


routers.get('/', (req, res) => {
  res.status(200).json({
    status: 'Succeses',
    message: 'Rest API is working fine.'
  });
});

module.exports = routers;