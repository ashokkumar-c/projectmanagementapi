const UserModel = require('../../models/user.model');
var Regex = require("regex");

exports.findUserByID = (req, res, next) => {
    UserModel.find({
        userId: req.params.id
    }, (err, User) => {
        if (err) {
            console.log(err.message);
            res.send(err);
        }
        if (User) {
            req.user = User;
            return next();
        } else {
            return next(err);
        }


        //return res.sendStatus(404);    
    }); // end of findById function.
};

/*
Get all users from users table.
*/
exports.getall = (req, res) => {    
    UserModel.find()  
        .then(usermodel => {
            res.status(200).json({
                status: "success",
                message: "Users retrieved successfully",
                data: usermodel
            });
        }).catch(error => {
            return res.status(500).json({
                status: 'failure',
                message: error.message
            });
        });
};

exports.get = (req, res) => {
    UserModel.find({
            userId: req.params.id
        })
        .then(objUserModel => {
            res.status(200).json({
                status: "success",
                message: "User retrieved successfully",
                data: objUserModel
            });
        }).catch(error => {
            return res.status(500).json({
                status: 'failure',
                message: error.message
            });
        });
};

//add a task in to task table

exports.add = (req, res) => {
    //validate the body content
    const user = new UserModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        employeeId: req.body.employeeId
    });
    user.save()
        .then(objUser => {
            res.status(200).json({
                status: "success",
                message: "New User created!",
                data: objUser
            });
        }).catch(error => {
            res.status(500).json({
                status: 'failure',
                message: error
            });
        });

}; // end of add task

exports.udpate = (req, res) => {
    // Validate Request
    // Find User and update it with the request body
    UserModel.findOneAndUpdate({
            userId: req.params.id
        }, req.body, {
            new: true
        })
        .then(objUserModel => {
            res.status(200).json({
                status: "success",
                message: "User with id " + req.params.id + " updated",
                data: objUserModel
            });
        }).catch(err => {
            return res.status(500).json({
                status: 'failure',
                message: "Error updating User with id " + req.params.id
            });
        });
};


exports.delete = (req, res) => {
    UserModel.findOneAndRemove({
            userId: req.params.id
        })
        .then(ObjUserModel => {
            res.status(200).json({
                status: "success",
                message: "User deleted successfully!"
            });
        }).catch(err => {
            return res.status(500).json({
                status: 'failure',
                message: "Could not delete Task with id " + req.params.id
            });
        });
};


/*
search users from user table
*/
exports.search = (req, res) => {
    let searchString = req.query.q;
    console.log(req.params);
    var regex = new RegExp(searchString, 'i');
    UserModel.find({
            $or: [{
                'firstName': regex
            }, {
                'lastName': regex
            }]
        })
        .then(usermodel => {
            res.status(200).json({
                status: "success",
                message: "Users retrieved successfully",
                data: usermodel
            });
        }).catch(error => {
            return res.status(500).json({
                status: 'failure',
                message: error.message
            });
        });
};
