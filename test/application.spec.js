process.env.NODE_ENV = "UNITTESTING";

const mongoose = require("mongoose");

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Applicaiton live Test', () => {

    /*
  * Test the /GET route
  */
    describe('=> check is app is running or not', () => {
        it('it should GET 200 response', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('Object'); 
                    res.body.should.have.property('status');                   
                    res.body.should.have.property('message');                   
                done();
            });
        });
    });
});