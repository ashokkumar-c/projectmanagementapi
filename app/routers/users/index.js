const users = require('express').Router();
const usercontroller = require('../../controllers/usercontroller');

users.route('/')
    .get(usercontroller.getall)
    .post(usercontroller.add);

users.route('/search/')
    .get(usercontroller.search);
    
users.use('/:id', usercontroller.findUserByID);

users.route('/:id')
    .get(usercontroller.get)
    .patch(usercontroller.udpate)
    .delete(usercontroller.delete);



module.exports = users;