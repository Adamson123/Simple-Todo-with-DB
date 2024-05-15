const mongoose = require('mongoose');
const connectionString = 'mongodb://localhost:27017/Todolists';

const connectTodb = async () =>{
  try {
    await mongoose.connect(connectionString);
    console.log('connected to db');
  } catch (error) {
    console.log('error cannot connect to db');
  }
}

module.exports = connectTodb;