require("dotenv").config("../.env");

module.exports = {
  MONGOURI: process.env.MONGO_URL,
  JWT_SECRET: process.env.JWT_SECRET,
};
