const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mandyjenny",
  database: "kusina",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the MySQL server.");
});

app.get("/users", (req, res) => {
  const sql = "SELECT * FROM user";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/users", (req, res) => {
  const { user_name, password } = req.body;

  const checkUserSql = "SELECT * FROM user WHERE user_name = ?";
  db.query(checkUserSql, [user_name], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length > 0) {
      return res.status(400).json({ error: "User already exists" });
    }

    const insertUserSql = "INSERT INTO user(user_name, password) VALUES (?, ?)";
    db.query(insertUserSql, [user_name, password], (err, results) => {
      if (err) return res.status(500).json({ error: err });
      return res.status(201).json({ message: "User registered successfully" });
    });
  });
});

app.listen(3001, () => {
  console.log("Listening to port 3001");
});
