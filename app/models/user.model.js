const mongoose = require('mongoose');
const { Schema } = mongoose;
const userModel = new Schema(
    {
      userId: { type: String, required:true , unique:true},
      firtName: { type: String, required:true },
      lastName: { type: String, required:true },
      employeeId: { type: String, required:true }      
    }
  );
  module.exports = mongoose.model('User', userModel);