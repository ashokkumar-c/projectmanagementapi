const mongoose = require('mongoose');
const mongooseSequence = require('mongoose-sequence')(mongoose);
const { Schema } = mongoose;

const taskModel = new Schema(
  {
    taskId: { type: Number },
    taskName: { type: String, required:true },
    isParentTask: {type:Boolean},
    priority: { type: Number, default: 0, min:0, max:30 },
    parentTaskId:{type:Number},    
    startDate: { type: Date , required:true},
    endDate: { type: Date , required:true},
    projectId:{type:Schema.Types.Number,ref: 'Projects', required:true},
    userId:{type:Schema.Types.Number,ref: 'Users', required:true},
    isCompleted: {type: Boolean}      
  }
);
taskModel.plugin(mongooseSequence,{id: 'taskId', inc_field: 'taskId'});
module.exports = mongoose.model('Task', taskModel);