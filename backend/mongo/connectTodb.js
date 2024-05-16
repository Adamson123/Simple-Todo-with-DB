const mongoose = require("mongoose");


const connectTodb = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("connected to db");
  } catch (error) {
    console.log("error cannot connect to db", error);
  }
};

module.exports = connectTodb;
