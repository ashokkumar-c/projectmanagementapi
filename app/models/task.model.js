const mongoose = require('mongoose');

const { Schema } = mongoose;

const taskModel = new Schema(
  {
    taskId: { type: String, unique:true, required:true },
    taskName: { type: String, required:true },
    isParentTask: {type:Boolean},
    priority: { type: Number, default: 0, min:0, max:30 },
    parentTaskId:{type:String},    
    startDate: { type: Date , required:true},
    endDate: { type: Date , required:true},
    projectId:{type:Schema.Types.ObjectId,ref: 'Projects', required:true},
    userId:{type:Schema.Types.ObjectId,ref: 'Users', required:true}      
  }
);