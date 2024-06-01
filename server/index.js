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

/*************** IUSER TABLE ***************/

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

/*************** ITEM TABLE ***************/

// create or add item
app.post("/items", (req, res) => {
  const { price, name, description, estab_id, classifications } = req.body;

  // insert item into the item table
  const insertItemSql =
    "INSERT INTO item (price, name, description, estab_id) VALUES (?, ?, ?, ?)";
  db.query(
    insertItemSql,
    [price, name, description, estab_id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err });

      const item_id = results.insertId;

      // insert classifications into the item_classification table
      if (classifications && classifications.length > 0) {
        const insertClassificationSql =
          "INSERT INTO item_classification (item_id, classification) VALUES ?";
        const classificationValues = classifications.map((classification) => [
          item_id,
          classification,
        ]);
        db.query(
          insertClassificationSql,
          [classificationValues],
          (err, results) => {
            if (err) return res.status(500).json({ error: err });
            return res.status(201).json({ message: "Item added successfully" });
          }
        );
      } else {
        return res.status(201).json({ message: "Item added successfully" });
      }
    }
  );
});

// read all item from establishment
app.get("/:estab_id/items", (req, res) => {
  const { estab_id } = req.params;
  const sql = "SELECT * FROM item WHERE estab_id = ?";
  db.query(sql, [estab_id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// read or search items
app.get("/items/search", (req, res) => {
  const { search_term } = req.query;
  const sql = "SELECT * FROM item WHERE name LIKE '%${search_term}%';";
  db.query(sql, (err, data) => {
    if (err) return res.status(500).json({ error: err });
    return res.json(data);
  });
});

// update item
app.put("/items/:item_id", (req, res) => {
  const { item_id } = req.params;
  const { price, name, description } = req.body;
  const sql =
    "UPDATE item SET price = ?, name = ?, description = ? WHERE item_id = ?";
  db.query(sql, [price, name, description, item_id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    return res.json({ message: "Item updated successfully" });
  });
});

// delete item
app.delete("/items/:item_id", (req, res) => {
  const { item_id } = req.params;
  const sql = "DELETE FROM item WHERE item_id = ?";
  db.query(sql, [item_id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    return res.json({ message: "Item deleted successfully" });
  });
});

app.listen(3001, () => {
  console.log("Listening to port 3001");
});
