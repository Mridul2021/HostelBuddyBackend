const express = require("express");
const app = express();
app.use("/files", express.static("files"));


// const test = require("./middleware/test");

const server = require("http").createServer(app);



const path = require("path");

require("dotenv").config();
const port = process.env.PORT || 3002;
const mongoose = require("mongoose");
const { MONGOURI } = require("./keys/key");
const cors = require("cors");

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//json
app.use(express.json({ extended: false }));
app.use(cors());



//----------------------db connection-------------------//
mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true, // Add this line to enable createIndex instead of ensureIndex
});

mongoose.connection.on("connected", async () => {
  console.log("connected to mongo ");
});
mongoose.connection.on("error", async (err) => {
  console.log("error connecting", err);
});
//-------------------------models-------------
require("./models/Complaint");
require("./models/RoomCleaning");
require("./models/Harresment");
require("./models/MessIssue");



//---------------------r---routes-------------
app.use(require("./routes/Complaint"));
app.use(require("./routes/RoomCleaning"));
app.use(require("./routes/Harresment"));
app.use(require("./routes/MessIssue"));

server.listen(port, () => {
  console.log(`Server started on port ${port}!`);
});