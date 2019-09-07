process.env.NODE_ENV = "UNITTESTING";

const mongoose = require("mongoose");
const projectTest = require("../app/models/project.model");
const moment = require('moment');


//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('project module Test', () => {

    describe('=> Test Post method', () => {
        it('It should throw error for mandatory fields', (done) => {
            let projectInput = {
                //projectName: 'unit test project',
                setDates: 'true',
                startDate: moment("05-06-1995", "MM-DD-YYYY"),
                endDate: moment("05-06-2019", "MM-DD-YYYY"),
                priority: 10,
                managerId: 4,
                isSuspended: 'false'
            };
            chai.request(server)
                .post('/projects')
                .send(projectInput)
                .end((err, res) => {
                    res.should.be.a('object');
                    res.body.should.have.property('status').eql('failure');
                    //res.body.should.have.property('message').eql('New project created!');
                    //res.body.data.should.have.property('projectId');
                    //res.body.data.should.have.property('firstName');
                    done();
                });
        });

        it('it should save a project', (done) => {
            let projectInput = {
                projectName: 'unit test project',
                setDates: 'true',
                startDate: moment("05-06-1995", "MM-DD-YYYY"),
                endDate: moment("05-06-2019", "MM-DD-YYYY"),
                priority: 10,
                managerId: 4,
                isSuspended: 'false'
            };
            chai.request(server)
                .post('/projects')
                .send(projectInput)
                .end((err, res) => {
                    res.should.be.a('object');
                    res.body.should.have.property('status').eql('success');
                    res.body.should.have.property('message').eql('New Project created!');
                    res.body.data.should.have.property('projectId');
                    res.body.data.should.have.property('projectName');
                    done();
                });
        });
    });

    describe('=> Test get methods', () => {
        it('It should all projects', (done) => {
            chai.request(server)
                .get('/projects')
                .end((err, res) => {
                    res.should.be.a('object');
                    res.body.should.have.property('status').eql('success');
                    done();
                });
        });

        it('It should get a project details', (done) => {
            var newproject = new projectTest({
                projectName: 'unit test project',
                setDates: 'true',
                startDate: moment("05-06-1995", "MM-DD-YYYY"),
                endDate: moment("05-06-2019", "MM-DD-YYYY"),
                priority: 10,
                managerId: 4,
                isSuspended: 'false'
            });
            newproject.save((err, data) => {
                chai.request(server)
                    .get('/projects/' + data.projectId)
                    .end((err, res) => {
                        res.should.be.a('object');
                        res.body.should.have.property('status').eql('success');
                        res.body.should.have.property('message').eql('Project retrieved successfully');
                        res.body.data[0].should.have.property('projectId');
                        res.body.data[0].should.have.property('projectName');
                        done();
                    });
            });

        });
    });

    describe('Update project details', () => {

        it('udpate field with invalid data', (done) => {
            let projectUpdatenewInput = {
                'priority': 'test'
            };
            var newUdateproject = new projectTest({
                projectName: 'unit test project',
                 setDates: 'true',
                 startDate: moment("05-06-1995", "MM-DD-YYYY"),
                 endDate: moment("05-06-2019", "MM-DD-YYYY"),
                 priority: 10,
                 managerId: 4,
                 isSuspended: 'false'
            });
            newUdateproject.save((err, data) => {
                chai.request(server)
                    .patch('/projects/' + data.projectId)
                    .send(projectUpdatenewInput)
                    .end((err, res) => {
                        console.log(res.body);
                        res.should.have.status(500);
                        res.body.should.be.a('object');
                        res.body.should.have.property('status').eql('failure');
                        res.body.should.have.property('message').eql('Error updating Project with id '+data.projectId);
                        done();
                    });
            });
        });

        it('successfuly update the data', (done) => {
            let projectUpdatenewInput = {
                'projectName': 'unit test project udpated',
            };
            var newUdateproject = new projectTest({
                projectName: 'unit test project',
                 setDates: 'true',
                 startDate: moment("05-06-1995", "MM-DD-YYYY"),
                 endDate: moment("05-06-2019", "MM-DD-YYYY"),
                 priority: 10,
                 managerId: 4,
                 isSuspended: 'false'
            });
            newUdateproject.save((err, data) => {
                chai.request(server)
                    .patch('/projects/' + data.projectId)
                    .send(projectUpdatenewInput)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('status').eql('success');
                        res.body.should.have.property('message').eql('Project with id ' + data.projectId + ' updated');
                        res.body.data.should.have.property('_id');
                        res.body.data.should.have.property('projectName').eql('unit test project udpated');
                        done();
                    });
            });
        });
    });

    describe('Delete a project document', () => {
        it(' => Deleate a project document successfully', (done) => {
            var newDeleteprojectInput = new projectTest({
                projectName: 'unit test project',
                setDates: 'true',
                startDate: moment("05-06-1995", "MM-DD-YYYY"),
                endDate: moment("05-06-2019", "MM-DD-YYYY"),
                priority: 10,
                managerId: 4,
                isSuspended: 'false'
            });
            newDeleteprojectInput.save((err, data) => {
                chai.request(server)
                    .delete('/projects/' + data.projectId)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('Project deleted successfully!');
                        done();
                    });
            });
        });
    });

    describe('search project documents', () => {
        it(' => search project documents successfully', (done) => {
            let searchText = {
                searchText: 'searchTest'
            };
            var newSearchprojectInput = new projectTest({
                projectName: 'searchTest',
                setDates: 'true',
                startDate: moment("05-06-1995", "MM-DD-YYYY"),
                endDate: moment("05-06-2019", "MM-DD-YYYY"),
                priority: 10,
                managerId: 4,
                isSuspended: 'false'
            });
            newSearchprojectInput.save((err, data) => {
                chai.request(server)
                    .get('/projects/search/')
                    .send(searchText)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('status').eql('success');
                        res.body.should.have.property('message').eql('Projects retrieved successfully');
                        res.body.data[0].should.have.property('_id');
                        res.body.data[0].should.have.property('projectName').eql('searchTest');
                        done();
                    });
            });
        });
    });
});