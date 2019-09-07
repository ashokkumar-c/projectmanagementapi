const mongoose = require('mongoose');
const mongooseSequence = require('mongoose-sequence')(mongoose);
const { Schema } = mongoose;
const userModel = new Schema(
    {
      userId: { type: Number},
      firstName: { type: String, required:true },
      lastName: { type: String, required:true },
      employeeId: { type: String, required:true }      
    }
  );
  userModel.plugin(mongooseSequence, {id: 'userId', inc_field: 'userId'});
  userModel.index({firstName: 'firstName', lastName: 'lastName'});
  module.exports = mongoose.model('User', userModel);