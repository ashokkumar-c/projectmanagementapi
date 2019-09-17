const TaskModel = require('../../models/task.model');
const ProjectModel = require('../../models/project.model');

exports.findTaskByID = (req, res, next) => {
    TaskModel.find({
        taskId: req.params.id
    }, (err, task) => {
        if (err) {            
            res.send(err);
        }
        if (task) {
            req.Task = task;
            return next();
        } else {
            return next(err);
        }


        //return res.sendStatus(404);    
    }); // end of findById function.
};

/*
Get all Tasks from Tasks table.
*/
exports.getall = (req, res) => {
    TaskModel.find()
        .then(TaskModel => {
            res.status(200).json({
                status: "success",
                message: "Tasks retrieved successfully",
                data: TaskModel
            });
        }).catch(error => {
            return res.status(500).json({
                status: 'failure',
                message: error.message
            });
        });
};

exports.get = (req, res) => {
    TaskModel.find({
            taskId: req.params.id
        })
        .then(objTaskModel => {
            res.status(200).json({
                status: "success",
                message: "Task retrieved successfully",
                data: objTaskModel
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

    const Task = new TaskModel({
        taskName: req.body.taskName,
        isParentTask: req.body.isParentTask,
        priority: req.body.priority,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        projectId: req.body.projectId,
        projectName: req.body.projectName,
        userId: req.body.userId,
        userName: req.body.userName,
        parentTaskId: req.body.parentTaskId,
        parentTaskName: req.body.parentTaskName
    });

    Task.save()
        .then(objTask => {
            taskProjectId = objTask.projectId;
            ProjectModel.find({
                projectId: taskProjectId
            })
            .then(objProjectModel => {              
                ProjectModel.findOneAndUpdate({
                    projectId: taskProjectId},{'noOfTasks': objProjectModel[0].noOfTasks ? objProjectModel[0].noOfTasks + 1 : 1 },{new: true}
                ).then(objUpdateProjectModel=>{
                    console.log('project id and no. of task'+ objUpdateProjectModel.projectId + ',' + objUpdateProjectModel.noOfTasks);
                    res.status(200).json({
                        status: "success",
                        message: "New Task created!",
                        data: objTask
                    });
                });                
            }).catch(error => {
                return res.status(500).json({
                    status: 'failure',
                    message: error.message
                });
            });           
        }).catch(error => {
            res.status(500).json({
                status: 'failure',
                message: error.message
            });
        });

}; // end of add task

exports.udpate = (req, res) => {

    // Find Task and update it with the request body
    TaskModel.findOneAndUpdate({
            taskId: req.params.id
        }, req.body, {
            new: true
        })
        .then(objTaskModel => {
            res.status(200).json({
                status: "success",
                message: "Task with id " + req.params.id + " updated",
                data: objTaskModel
            });
        }).catch(err => {
            return res.status(500).json({
                status: 'failure',
                message: "Error updating Task with id " + req.params.id
            });
        });
};


exports.delete = (req, res) => {
    TaskModel.findOneAndRemove({
            taskId: req.params.id
        })
        .then(ObjTaskModel => {
            res.status(200).json({
                status: "success",
                message: "Task deleted successfully!"
            });
        }).catch(err => {
            return res.status(500).json({
                status: 'failure',
                message: "Could not delete Task with id " + req.params.id
            });
        });
};

exports.search = (req, res) => {
    let searchString = req.query.q;
    var regex = new RegExp(searchString, 'i');
    TaskModel.find({
            'taskName': regex
        })
        .then(objTaskModel => {
            res.status(200).json({
                status: "success",
                message: "Tasks retrieved successfully",
                data: objTaskModel
            });
        }).catch(error => {
            return res.status(500).json({
                status: 'failure',
                message: error.message
            });
        });
};

exports.getTasksByProjectId = (req, res) => {
    let id = req.params.id;
    //var regex = new RegExp(searchString, 'i');
    TaskModel.find({
            'projectId': id
        })
        .then(objTaskModel => {
            res.status(200).json({
                status: "success",
                message: "Tasks retrieved successfully",
                data: objTaskModel
            });
        }).catch(error => {
            return res.status(500).json({
                status: 'failure',
                message: error.message
            });
        });
};

exports.getParentTasksByProjectId = (req, res) => {
    let searchString = req.query.q;
    let id = req.params.id;
    var regex = new RegExp(searchString, 'i');
    //var regex = new RegExp(searchString, 'i');
    TaskModel.find({
            'projectId': id,
            'taskName': regex,
            'isParentTask':true
        })
        .then(objTaskModel => {
            res.status(200).json({
                status: "success",
                message: "Tasks retrieved successfully",
                data: objTaskModel
            });
        }).catch(error => {
            return res.status(500).json({
                status: 'failure',
                message: error.message
            });
        });
};