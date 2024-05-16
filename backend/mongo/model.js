const mongoose = require("mongoose");

// const { type } = require("os");
// const { boolean } = require("webidl-conversions");

const schema = new mongoose.Schema({
  task: {
    type:String,
    required:[true,'value must be provided'],
    trim:true,
    maxlength:[20, 'value should not be more than 20']
  },
  completed:{
    type: Boolean,
    default: false
  }
});

const model = mongoose.model("tasks", schema);

module.exports = model;
