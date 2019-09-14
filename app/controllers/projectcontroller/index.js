const ProjectModel = require('../../models/project.model');
const TaskModel = require('../../models/task.model');

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
    var result;
    ProjectModel.find()
        .then(objProjectModel => { 
            result = objProjectModel;       
           /* objProjectModel.forEach((d,i) =>{
                let query = { projectId: d.projectId };
                TaskModel.find(query,(error, taskData) => {
                    result[i].noOfTasks = taskData.length;
                });
            });*/
            res.status(200).json({
                status: "success",
                message: "Projects retrieved successfully",
                data: result
            });           
        }).catch(error => {
            return res.status(500).json({
                status: 'failure',
                message: error.message
            });
        });
};

exports.get = (req, res) => {
    ProjectModel.find({
            projectId: req.params.id
        })
        .then(objProjectModel => {
            res.status(200).json({
                status: "success",
                message: "Project retrieved successfully",
                data: objProjectModel
            });
        }).catch(error => {
            return res.status(500).json({
                status: 'failure',
                message: err.message
            });
        });
};

//add a task in to task table

exports.add = (req, res) => {

    const project = new ProjectModel({
        projectName: req.body.projectName,
        setDates: req.body.setDates,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        priority: req.body.priority,
        managerId: req.body.managerId,
        managerName: req.body.managerName,
        isSuspended: false,
        noOfTasks:0
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
    // Find Project and update it with the request body
    ProjectModel.findOneAndUpdate({
            projectId: req.params.id
        }, req.body, {
            new: true
        })
        .then(objProjectModel => {
            res.status(200).json({
                status: "success",
                message: "Project with id " + req.params.id + " updated",
                data: objProjectModel
            });
        }).catch(err => {
            return res.status(500).json({
                status: 'failure',
                message: "Error updating Project with id " + req.params.id
            });
        });
};


exports.delete = (req, res) => {
    ProjectModel.findOneAndRemove({
            projectId: req.params.id
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
    let searchString = req.query.q;
    var regex = new RegExp(searchString, 'i');
    ProjectModel.find({'projectName': regex })
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