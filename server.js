// npm run start

const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const server = express();
const host = "localhost";
const port = 8888;
const cors = require("cors");
const { default: helmet } = require("helmet");
server.use(express.json());
server.use(cors());
server.use(helmet());

const db = new sqlite3.Database("./db.sqlite", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the database.");
});
server.post("/submit-form", (req, res) => {
  const { name, number,email } = req.body;

  db.run(
    "INSERT INTO quotes (name, number) VALUES (?, ?)",
    [name, number,email],
    function (err) {
      if (err) {
        return console.error(err.message);
      }
      console.log(`A new row has been inserted at Quote-table with rowid ${this.lastID}`);
      res.send("Form data successfully submitted");
    }
  );
});



// =========================================================================================
server.post("/nri-form", (req, res) => {
  const { name, number, email, comment } = req.body;

  db.run(
    "INSERT INTO nri_data (name, number, email, comment) VALUES (?, ?, ?, ?)",
    [name, number, email, comment],
    function (err) {
      if (err) {
        return console.error(err.message);
      }
      console.log(`A new row has been inserted at nri-data-table with rowid ${this.lastID}`);
      res.send("Form data successfully submitted to SQLite database");
    }
  );
});
server.get("/", (req, res) => {
  res.status(200).send("server is running ok")

});




server.listen(port, () => {
  console.log(`Server is running on ${host}:${port}`);
});