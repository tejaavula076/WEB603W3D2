const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();

app.use(bodyParser.json());
app.use(cors());

require("./app/models/book.model.js");

const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE);

mongoose.connection
  .on("open", () => {
    console.log("Mongo connection open");
  })
  .on("error", (err) => {
    console.log("Connection error:", err.message);
  });

require("./app/routes/book.router.js")(app);

const server = app.listen(8080, function () {
  const host = server.address().address;
  const port = server.address().port;

  console.log("App listening at http://%s:%s", host, port);
});