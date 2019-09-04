const mongoose = require('mongoose');
const { Schema } = mongoose;
const projectModel = new Schema(
    {
      projectId: { type: String, required:true, unique:true },
      projectName: { type: String, required:true },
      setDates: {type:Boolean},
      startDate: { type: Date},
      endDate: { type: Date},
      priority: { type: Number, required:true, min:0, max:30},
      userId:{type:Schema.Types.ObjectId,ref: 'Users', required:true},  //manager id
      isSuspended: {type:Boolean}
    }
  );
  module.exports = mongoose.model('Project', projectModel);