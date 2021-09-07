require("dotenv").config();
const mysql = require("mysql");

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const con = mysql.createConnection({
  host: DB_HOST || "127.0.0.1",
  user: DB_USER || "root",
  password: DB_PASS,
  database: DB_NAME || "saiMVP",
  multipleStatements: true
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  let sql =
    "DROP TABLE IF EXISTS contacts; DROP TABLE IF EXISTS events; DROP TABLE IF EXISTS stickers; CREATE TABLE contacts (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, name VARCHAR(100), phone VARCHAR(15), birthday VARCHAR(15)); CREATE TABLE events (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, date VARCHAR(40), title VARCHAR(40)); CREATE TABLE stickers (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, title VARCHAR(40), url VARCHAR(2083), creator VARCHAR(40), theme VARCHAR(40));";
  con.query(sql, function(err, result) {
    if (err) throw err;
    console.log("Table creation `contacts, events, stickers` were successful!");

    console.log("Closing...");
  });

  con.end();
});

