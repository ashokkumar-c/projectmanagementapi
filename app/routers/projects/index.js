const projects = require('express').Router();
const projectcontroller = require('../../controllers/projectcontroller');

projects.route('/')
    .get(projectcontroller.getall)
    .post(projectcontroller.add);

projects.use('/:id', projectcontroller.findProjectByID);

projects.route('/search/')
    .get(projectcontroller.search);

projects.route('/:id')
    .get(projectcontroller.get)
    .patch(projectcontroller.udpate)
    .delete(projectcontroller.delete);

module.exports = projects;