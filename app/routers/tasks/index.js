const tasks = require('express').Router();
const taskcontroller = require('../../controllers/taskcontroller');

tasks.route('/')
    .get(taskcontroller.getall)
    .post(taskcontroller.add);

tasks.use('/:id', taskcontroller.findTaskByID);

tasks.route('/:id')
    .get(taskcontroller.get)
    .patch(taskcontroller.udpate)
    .delete(taskcontroller.delete);

module.exports = tasks;