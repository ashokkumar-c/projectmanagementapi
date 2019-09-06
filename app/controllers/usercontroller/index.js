const UserModel = require('../../models/user.model');

exports.findUserByID = (req, res, next) => {
    UserModel.find({
        userId: req.params.id
    }, (err, User) => {
        if (err) {
            console.log(err.message);
            res.send(err);
        }
        if (User) {
            console.log("inside if block");
            req.user = User;
            console.log(req.user);
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
            if (!usermodel) {
                return res.status(404).json({
                    status: 'failure',
                    message: 'unable to get users'
                });
            }
            res.status(200).json({
                status: "success",
                message: "Users retrieved successfully",
                data: usermodel
            });
        }).catch(error => {
            if (err.kind === 'ObjectId') {
                return res.status(404).json({
                    status: 'failure',
                    message: 'Unable to retrieve Users'
                });
            }
            return res.status(500).json({
                status: 'failure',
                message: err.message
            });
        });
};

exports.get = (req, res) => {
    UserModel.find({
            userId: req.params.id
        })
        .then(objUserModel => {
            if (!objUserModel) {
                return res.status(404).json({
                    status: 'failure',
                    message: 'User not found with id ' + req.params.id
                });
            }
            res.status(200).json({
                status: "success",
                message: "User retrieved successfully",
                data: objUserModel
            });
        }).catch(error => {
            if (err.kind === 'ObjectId') {
                return res.status(404).json({
                    status: 'failure',
                    message: "User not found with id " + req.params.id
                });
            }
            return res.status(500).json({
                status: 'failure',
                message: err.message
            });
        });
};

//add a task in to task table

exports.add = (req, res) => {
    //validate the body content
    if (!req.body) {
        return res.status(400).json({
            status: 'failure',
            message: 'User body can not be empty'
        });
    }

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
    if (!req.body) {
        return res.status(400).json({
            status: 'failure',
            message: "Request body content can not be empty"
        });
    }

    // Find User and update it with the request body
    UserModel.findOneAndUpdate({
            userId: req.params.id
        }, req.body, {
            new: true
        })
        .then(objUserModel => {
            if (!objUserModel) {
                return res.status(404).json({
                    status: 'failure',
                    message: "User not found with id " + req.params.id
                });
            }
            res.status(200).json({
                status: "success",
                message: "User with id " + req.params.id + " updated",
                data: objUserModel
            });
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).json({
                    status: 'failure',
                    message: "User not found with id " + req.params.id
                });
            }
            return res.status(500).json({
                status: 'failure',
                message: "Error updating User with id " + req.params.id
            });
        });
};


exports.delete = (req, res) => {
    UserModel.findOneAndRemove({
            UserId: req.params.id
        })
        .then(ObjUserModel => {
            if (!ObjUserModel) {
                return res.status(404).json({
                    status: 'failure',
                    message: "User not found with id " + req.params.id
                });
            }
            res.status(200).json({
                status: "success",
                message: "User deleted successfully!"
            });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).json({
                    status: 'failure',
                    message: "Task not found with id " + req.params.id
                });
            }
            return res.status(500).json({
                status: 'failure',
                message: "Could not delete Task with id " + req.params.id
            });
        });
};