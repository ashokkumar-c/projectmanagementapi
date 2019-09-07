const mongoose = require('mongoose');
const mongooseSequence = require('mongoose-sequence')(mongoose);
const { Schema } = mongoose;
const projectModel = new Schema(
    {
      projectId: { type: Number },     
      projectName: { type: String, required:true },
      setDates: {type:Boolean},
      startDate: { type: Date},
      endDate: { type: Date},
      priority: { type: Number, required:true, min:0, max:30},
      managerId:{type:Schema.Types.Number ,ref: 'Users', required:true},  //manager id
      isSuspended: {type:Boolean}
    }
  );
  projectModel.plugin(mongooseSequence,{id: 'projectId', inc_field: 'projectId'});
  module.exports = mongoose.model('Project', projectModel);