const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");
const compression = require("compression");

// Database
const db = require("./config/database");

async function testDB() {
  try {
    await db.connect();
    console.log("DB Connection has been established successfully");
  } catch (e) {
    console.error("Unable to connect to database", e);
  }
}

testDB();

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(compression());

// main routes
app.get("/", (req, res) => res.send("Index"));
app.use("/gigs", require("./controllers/gigs/gigsRoutes"));

const PORT = process.env.PORT || 5000;

// fallback
app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!");
});

app.listen(PORT, console.log(`server started on port ${PORT}`));
