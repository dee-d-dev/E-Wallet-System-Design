const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`) });
if (process.env.NODE_ENV == "test") {
  MONGO_URI = process.env.TEST_MONGO_URI;
} else {
  MONGO_URI = process.env.db;
}

module.exports = {
  NODE_ENV: process.env.NODE_ENV || "development",
  HOST: process.env.HOST || "localhost",
  PORT: process.env.PORT || 3000,
  MONGO_URI,
};
