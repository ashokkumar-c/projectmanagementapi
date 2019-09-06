const mongoose = require('mongoose');
const mongooseSequence = require('mongoose-sequence')(mongoose);
const { Schema } = mongoose;
const userModel = new Schema(
    {
      //_id: {type:Number},
      userId: { type: Number},
      firstName: { type: String, required:true },
      lastName: { type: String, required:true },
      employeeId: { type: String, required:true }      
    }//,{ _id: false }
  );
  userModel.plugin(mongooseSequence, {id: 'userId', inc_field: 'userId'});//, {inc_field: 'userId'});
  module.exports = mongoose.model('User', userModel);