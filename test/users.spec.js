process.env.NODE_ENV = "UNITTESTING";

const mongoose = require("mongoose");
const UserTest = require("../app/models/user.model");


//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('User module Test', () => {

    describe('=> Test Post method', () => {
        it('It should throw error for mandatory fields', (done) => {
            let userInput = {
                //"firstName": "Unit Test first Name",
                "lastName": "Unit Test last Name",
                "employeeId": "125174"
            };
            chai.request(server)
            .post('/users')
            .send(userInput)
            .end((err,res)=>{
                res.should.be.a('object');
                res.body.should.have.property('status').eql('failure');
                //res.body.should.have.property('message').eql('New User created!');
                //res.body.data.should.have.property('UserId');
                //res.body.data.should.have.property('firstName');
                done();
            });
        });

        it('it should save a user', (done) => {
            let userInput = {
                "firstName": "Unit Test first Name",
                "lastName": "Unit Test last Name",
                "employeeId": "125174"
            };
            chai.request(server)
            .post('/users')
            .send(userInput)
            .end((err,res)=>{
                res.should.be.a('object');
                res.body.should.have.property('status').eql('success');
                res.body.should.have.property('message').eql('New User created!');
                res.body.data.should.have.property('userId');
                res.body.data.should.have.property('firstName');
                done();
            });
        });
    });
    
    describe('=> Test get methods', () => {
        it('It should all users', (done) => {
            chai.request(server)
            .get('/users')           
            .end((err,res)=>{
                res.should.be.a('object');
                res.body.should.have.property('status').eql('success');
                done();
            });
        });

        it('It should get a user details', (done) => {
            var newUser = new UserTest({
                firstName: 'my unit test first name',
                lastName: 'my unit test last name',
                employeeId: '123456'
            });
            newUser.save((err, data)=>{
                chai.request(server)
                .get('/users/'+data.userId)           
                .end((err,res)=>{
                    res.should.be.a('object');
                    res.body.should.have.property('status').eql('success');                  
                    res.body.should.have.property('message').eql('User retrieved successfully');
                    res.body.data[0].should.have.property('userId');
                    res.body.data[0].should.have.property('firstName');
                    done();
                });
            });
            
        });
    });

    describe('Update user details', ()=> {

        // it('udpate field with blank value',(done)=>{
        //     let userUpdatenewInput = {
        //         '1firstName': ''
        //     };
        //     var newUdateUser = new UserTest({
        //         firstName: 'my unit test first name',
        //         lastName: 'my unit test last name',
        //         employeeId: '123456'
        //     });
        //     newUdateUser.save((err,data)=>{
        //         chai.request(server)
        //         .patch('/users/'+data.userId)
        //         .send(userUpdatenewInput)
        //         .end((err, res) => {
        //             //console.log(res.body);
        //             res.should.have.status(500);
        //             res.body.should.be.a('object');
        //             //res.body.should.have.property('status').eql('failure');
        //             res.body.should.have.property('message').eql('Cast to number failed for value "test" at path "userId" for model "User"');
        //             //res.body.data.should.have.property('_id');
        //             //res.body.data.should.have.property('firstName').eql('update unit test');
        //             done();
        //         });
        //     });
        // });

        it('successfuly update the data',(done)=>{
            let userUpdatenewInput = {
                'firstName': 'update unit test',
            };
            var newUdateUser = new UserTest({
                firstName: 'my unit test first name',
                lastName: 'my unit test last name',
                employeeId: '123456'
            });
            newUdateUser.save((err,data)=>{
                chai.request(server)
                .patch('/users/'+data.userId)
                .send(userUpdatenewInput)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql('success');
                    res.body.should.have.property('message').eql('User with id '+ data.userId +' updated');
                    res.body.data.should.have.property('_id');
                    res.body.data.should.have.property('firstName').eql('update unit test');
                    done();
                });
            });
        });
    });

    describe('Delete a user document', ()=>{
        it(' => Deleate a user document successfully', (done)=>{
            var newDeleteUserInput = new UserTest({
                firstName: 'my unit test first name',
                lastName: 'my unit test last name',
                employeeId: '123456'
            });
            newDeleteUserInput.save((err,data)=>{
                chai.request(server)
                .delete('/users/' + data.userId)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('User deleted successfully!');
                    done();
                }); 
            });    
        });
    });

    describe('search user documents', ()=>{
        it(' => search user documents successfully', (done)=>{
            let searchText = {
                searchText : 'searchTest'
            };            
            var newSearchUserInput = new UserTest({
                firstName: 'searchTest',
                lastName: 'my unit test last name',
                employeeId: '123456'
            });
            newSearchUserInput.save((err,data)=>{
                chai.request(server)
                .get('/users/search/')
                .send(searchText)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql('success');
                    res.body.should.have.property('message').eql('Users retrieved successfully');
                    res.body.data[0].should.have.property('_id');
                    res.body.data[0].should.have.property('firstName').eql('searchTest');
                    done();
                }); 
            });    
        });
    });
});