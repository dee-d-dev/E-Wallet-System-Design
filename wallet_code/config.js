const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`) });
MONGO_URI =
  "mongodb+srv://wallet:wallet@cluster0.qxt4o.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

module.exports = {
  NODE_ENV: process.env.NODE_ENV || "development",
  HOST: process.env.HOST || "localhost",
  PORT: process.env.PORT || 3000,
  MONGO_URI
};
