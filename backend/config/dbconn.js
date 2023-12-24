const mongoose = require("mongoose");

const dbconn = async (req, res) => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/jwt-token-db");
    console.log("database connection established");
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = dbconn;
