const UserModel = require('../../models/user.model');

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