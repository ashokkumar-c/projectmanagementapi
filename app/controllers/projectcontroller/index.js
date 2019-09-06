const ProjectModel = require('../../models/project.model');

exports.findProjectByID = (req, res, next) => {
    ProjectModel.find({
        ProjectId: req.params.id
    }, (err, Project) => {
        if (err) {
            console.log(err.message);
            res.send(err);
        }
        if (Project) {
            req.Project = Project;
            return next();
        } else {
            return next(err);
        }


        //return res.sendStatus(404);    
    }); // end of findById function.
};

/*
Get all Projects from Projects table.
*/
exports.getall = (req, res) => {
    ProjectModel.find()
        .then(ProjectModel => {
            if (!ProjectModel) {
                return res.status(404).json({
                    status: 'failure',
                    message: 'unable to get Projects'
                });
            }
            res.status(200).json({
                status: "success",
                message: "Projects retrieved successfully",
                data: ProjectModel
            });
        }).catch(error => {
            if (err.kind === 'ObjectId') {
                return res.status(404).json({
                    status: 'failure',
                    message: 'Unable to retrieve Projects'
                });
            }
            return res.status(500).json({
                status: 'failure',
                message: err.message
            });
        });
};

exports.get = (req, res) => {
    ProjectModel.find({
            ProjectId: req.params.id
        })
        .then(objProjectModel => {
            if (!objProjectModel) {
                return res.status(404).json({
                    status: 'failure',
                    message: 'Project not found with id ' + req.params.id
                });
            }
            res.status(200).json({
                status: "success",
                message: "Project retrieved successfully",
                data: objProjectModel
            });
        }).catch(error => {
            if (err.kind === 'ObjectId') {
                return res.status(404).json({
                    status: 'failure',
                    message: "Project not found with id " + req.params.id
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
            message: 'Project body can not be empty'
        });
    }

    const project = new ProjectModel({
        projectName: req.body.projectName,
        setDates: req.body.setDates,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        priority: req.body.priority,
        managerId: req.body.managerId,
        isSuspended: req.body.isSuspended
    });

    project.save()
        .then(objProject => {
            res.status(200).json({
                status: "success",
                message: "New Project created!",
                data: objProject
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

    // Find Project and update it with the request body
    ProjectModel.findOneAndUpdate({
            ProjectId: req.params.id
        }, req.body, {
            new: true
        })
        .then(objProjectModel => {
            if (!objProjectModel) {
                return res.status(404).json({
                    status: 'failure',
                    message: "Project not found with id " + req.params.id
                });
            }
            res.status(200).json({
                status: "success",
                message: "Project with id " + req.params.id + " updated",
                data: objProjectModel
            });
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).json({
                    status: 'failure',
                    message: "Project not found with id " + req.params.id
                });
            }
            return res.status(500).json({
                status: 'failure',
                message: "Error updating Project with id " + req.params.id
            });
        });
};


exports.delete = (req, res) => {
    ProjectModel.findOneAndRemove({
            ProjectId: req.params.id
        })
        .then(ObjProjectModel => {
            if (!ObjProjectModel) {
                return res.status(404).json({
                    status: 'failure',
                    message: "Project not found with id " + req.params.id
                });
            }
            res.status(200).json({
                status: "success",
                message: "Project deleted successfully!"
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

exports.search = (req, res) => {
    ProjectModel.find()
        .then(ProjectModel => {
            if (!ProjectModel) {
                return res.status(404).json({
                    status: 'failure',
                    message: 'unable to get Projects'
                });
            }
            res.status(200).json({
                status: "success",
                message: "Projects retrieved successfully",
                data: ProjectModel
            });
        }).catch(error => {
            if (err.kind === 'ObjectId') {
                return res.status(404).json({
                    status: 'failure',
                    message: 'Unable to retrieve Projects'
                });
            }
            return res.status(500).json({
                status: 'failure',
                message: err.message
            });
        });
};