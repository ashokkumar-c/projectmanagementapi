process.env.NODE_ENV = "UNITTESTING";

const mongoose = require("mongoose");
const taskTest = require("../app/models/task.model");
const moment = require('moment');


//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('task module Test', () => {

    describe('=> Test Post method', () => {
        it('It should throw error for mandatory fields', (done) => {
            let taskInput = {
                //taskName: 'Unit Task name',
                isParentTask: 'false',
                priority: 10,
                parentTaskId: '',
                startDate: moment("05-06-1995", "MM-DD-YYYY"),
                endDate: moment("05-06-2019", "MM-DD-YYYY"),
                projectId: 10,
                userId: 20,
                isCompleted: 'false'
            };
            chai.request(server)
                .post('/tasks')
                .send(taskInput)
                .end((err, res) => {
                    res.should.be.a('object');
                    res.body.should.have.property('status').eql('failure');
                    //res.body.should.have.property('message').eql('New task created!');
                    //res.body.data.should.have.property('taskId');
                    //res.body.data.should.have.property('firstName');
                    done();
                });
        });

        it('it should save a task', (done) => {
            let newTask = {
                taskName: 'Unit Task name',
                isParentTask: 'false',
                priority: 10,
                parentTaskId: '',
                startDate: moment("05-06-1995", "MM-DD-YYYY"),
                endDate: moment("05-06-2019", "MM-DD-YYYY"),
                projectId: 10,
                userId: 20,
                isCompleted: 'false'
            };
            chai.request(server)
                .post('/tasks')
                .send(newTask)
                .end((err, res) => {
                    res.should.be.a('object');
                    res.body.should.have.property('status').eql('success');
                    res.body.should.have.property('message').eql('New Task created!');
                    res.body.data.should.have.property('taskId');
                    res.body.data.should.have.property('taskName');
                    done();
                });
        });
    });

    describe(' Test get methods', () => {
        it(' => It should all tasks', (done) => {
            chai.request(server)
                .get('/tasks')
                .end((err, res) => {
                    res.should.be.a('object');
                    res.body.should.have.property('status').eql('success');
                    done();
                });
        });

        it('It should get a task details', (done) => {
            var newtask = new taskTest({
                taskName: 'Unit Task name',
                isParentTask: 'false',
                priority: 10,
                parentTaskId: '',
                startDate: moment("05-06-1995", "MM-DD-YYYY"),
                endDate: moment("05-06-2019", "MM-DD-YYYY"),
                projectId: 10,
                userId: 20,
                isCompleted: 'false'
            });
            newtask.save((err, data) => {
                chai.request(server)
                    .get('/tasks/' + data.taskId)
                    .end((err, res) => {
                        res.should.be.a('object');
                        res.body.should.have.property('status').eql('success');
                        res.body.should.have.property('message').eql('Task retrieved successfully');
                        res.body.data[0].should.have.property('taskId');
                        res.body.data[0].should.have.property('taskName');
                        done();
                    });
            });

        });
    });

    describe('Update task details', () => {

        it('udpate field with invalid data', (done) => {
            let taskUpdatenewInput = {
                'priority': 'test'
            };
            var newUdatetask = new taskTest({
                taskName: 'Unit Task name',
                isParentTask: 'false',
                priority: 10,
                parentTaskId: '',
                startDate: moment("05-06-1995", "MM-DD-YYYY"),
                endDate: moment("05-06-2019", "MM-DD-YYYY"),
                projectId: 10,
                userId: 20,
                isCompleted: 'false'
            });
            newUdatetask.save((err, data) => {
                chai.request(server)
                    .patch('/tasks/' + data.taskId)
                    .send(taskUpdatenewInput)
                    .end((err, res) => {
                        res.should.have.status(500);
                        res.body.should.be.a('object');
                        res.body.should.have.property('status').eql('failure');
                        res.body.should.have.property('message').eql('Error updating Task with id ' + data.taskId);
                        done();
                    });
            });
        });

        it('successfuly update the data', (done) => {
            let taskUpdatenewInput = {
                'taskName': 'unit test task udpated',
            };
            var newUdatetask = new taskTest({
                taskName: 'Unit Task name',
                isParentTask: 'false',
                priority: 10,
                parentTaskId: '',
                startDate: moment("05-06-1995", "MM-DD-YYYY"),
                endDate: moment("05-06-2019", "MM-DD-YYYY"),
                projectId: 10,
                userId: 20,
                isCompleted: 'false'
            });
            newUdatetask.save((err, data) => {
                chai.request(server)
                    .patch('/tasks/' + data.taskId)
                    .send(taskUpdatenewInput)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('status').eql('success');
                        res.body.should.have.property('message').eql('Task with id ' + data.taskId + ' updated');
                        res.body.data.should.have.property('_id');
                        res.body.data.should.have.property('taskName').eql('unit test task udpated');
                        done();
                    });
            });
        });
    });

    describe('Delete a task document', () => {
        it(' => Deleate a task document successfully', (done) => {
            var newDeletetaskInput = new taskTest({
                taskName: 'Unit Task name',
                isParentTask: 'false',
                priority: 10,
                parentTaskId: '',
                startDate: moment("05-06-1995", "MM-DD-YYYY"),
                endDate: moment("05-06-2019", "MM-DD-YYYY"),
                projectId: 10,
                userId: 20,
                isCompleted: 'false'
            });
            newDeletetaskInput.save((err, data) => {
                chai.request(server)
                    .delete('/tasks/' + data.taskId)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('Task deleted successfully!');
                        done();
                    });
            });
        });
    });

    describe('search task documents', () => {
        it(' => search task documents successfully', (done) => {
            let searchText = {
                searchText: 'searchTest'
            };
            var newSearchtaskInput = new taskTest({
                taskName: 'searchTest',
                isParentTask: 'false',
                priority: 10,
                parentTaskId: '',
                startDate: moment("05-06-1995", "MM-DD-YYYY"),
                endDate: moment("05-06-2019", "MM-DD-YYYY"),
                projectId: 10,
                userId: 20,
                isCompleted: 'false'
            });
            newSearchtaskInput.save((err, data) => {
                chai.request(server)
                    .get('/tasks/search/?q=searchTest')
                    //.send(searchText)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('status').eql('success');
                        res.body.should.have.property('message').eql('Tasks retrieved successfully');
                        res.body.data[0].should.have.property('_id');
                        res.body.data[0].should.have.property('taskName').eql('searchTest');
                        done();
                    });
            });
        });
    });
});