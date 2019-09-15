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
    parentTaskName: {type: String, default:''},    
    startDate: { type: Date , default: ''},
    endDate: { type: Date , default: ''},
    projectId:{type:Schema.Types.Number,ref: 'Projects', required:true},
    projectName: {type: String, default:''},
    userId:{type:Schema.Types.Number,ref: 'Users'},
    userName: {type:String, default:''},
    isCompleted: {type: Boolean,default:false}      
  }
);
taskModel.plugin(mongooseSequence,{id: 'taskId', inc_field: 'taskId'});
module.exports = mongoose.model('Task', taskModel);