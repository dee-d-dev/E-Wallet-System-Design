const mongoose = require("mongoose");

const db_connection = (url) => {
  mongoose.connect(
    url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    () => {
      console.log("db connected successfully");
    }
  );
};

module.exports = db_connection;
