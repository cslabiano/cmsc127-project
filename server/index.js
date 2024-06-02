const express = require("express");
const bcrypt = require("bcryptjs");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  // NOTE: CHANGE PASSWORD BASED ON YOUR PERSONAL COMPUTER'S MYSQL ROOT ACCOUNT PASSWORD
  password: "mandyjenny",
  database: "kusina",
});

db.connect((err) => {
  //connecting the database
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the MySQL server.");
});

/*********** USER TABLE ************/

app.post("/login", (req, res) => {
  //getting all users
  const { user_name, password } = req.body;

  const getUserSql =
    "SELECT * FROM user WHERE user_name = ? AND password = PASSWORD(?)";
  db.query(getUserSql, [user_name, password], (err, results) => {
    if (err) return res.status(500).json({ error: err });

    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    return res.status(200).json({ message: "Login successful" });
  });
});

app.post("/signup", (req, res) => {
  //for signing up
  const { user_name, password } = req.body;

  const checkUserSql = "SELECT * FROM user WHERE user_name = ?";
  db.query(checkUserSql, [user_name], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length > 0) {
      return res.status(400).json({ error: "User already exists" });
    }

    const insertUserSql =
      "INSERT INTO user(user_name, password) VALUES (?, PASSWORD(?))";
    db.query(insertUserSql, [user_name, password], (err, results) => {
      if (err) return res.status(500).json({ error: err });
      return res.status(201).json({ message: "User registered successfully" });
    });
  });
});

/*************** ESTABLISHMENT TABLE ***************/

app.get("/establishment", (req, res) => {
  const { sort } = req.query;
  const sortOrder = sort === "asc" ? "ASC" : "DESC";
  const sql = `SELECT e.estab_id, e.estab_name, e.address, e.image_link, COALESCE(AVG(er.rating), 0) AS avg_rating FROM establishment e LEFT JOIN estabreview er ON e.estab_id = er.estab_id GROUP BY e.estab_id ORDER BY avg_rating ${sortOrder}`;
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/establishments", (req, res) => {
  const { estab_name, address } = req.body;

  const checkEstabSql =
    "SELECT * FROM establishment where estab_name = ? and address = ?";
  db.query(checkEstabSql, [estab_name, address], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length > 0) {
      return res
        .status(400)
        .json({ error: "Establishment in that address already exists" });
    }

    const insertEstabSql =
      "INSERT INTO establishment(estab_name, address) VALUES (?, ?)";
    db.query(insertEstabSql, [estab_name, address], (err, results) => {
      if (err) return res.status(500).json({ error: err });
      return res
        .status(201)
        .json({ message: "Establishment added successfully" });
    });
  });
});

app.post("/establishmentSearch", (req, res) => {
  const { estab_name } = req.body;

  const findEstabSql =
    "SELECT e.estab_id, e.estab_name, e.address, COALESCE(AVG(er.rating), 0) AS avg_rating, e.image_link FROM establishment e LEFT JOIN estabreview er ON e.estab_id = er.estab_id WHERE LOWER(e.estab_name) LIKE LOWER(?) GROUP BY e.estab_id";
  db.query(findEstabSql, [`%${estab_name}%`], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length > 0) {
      return res.status(200).json(results);
    }
  });
});

/*************** ITEM TABLE ***************/

// create or add item
app.post("/item", (req, res) => {
  const { price, name, description, image_link, estab_id, classifications } =
    req.body;

  // insert item into the item table
  const insertItemSql =
    "INSERT INTO item (price, name, description, image_link, estab_id) VALUES (?, ?, ?, ?, ?)";
  db.query(
    insertItemSql,
    [price, name, description, image_link, estab_id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      const item_id = results.insertId;

      // insert classifications into the item_class table
      if (classifications && classifications.length > 0) {
        const insertClassificationSql =
          "INSERT INTO itemclass (item_id, classification) VALUES ?";
        console.log(item_id);
        const classificationValues = classifications.map((classification) => [
          item_id,
          classification,
        ]);
        db.query(
          insertClassificationSql,
          [classificationValues],
          (err, results) => {
            if (err) {
              return res.status(500).json({ error: err });
            }
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
app.get(`/:estab_id`, (req, res) => {
  const { estab_id } = req.params;
  const sql = `
    SELECT i.*, e.estab_name AS establishmentName, i.image_link as imageLink, e.address AS establishmentAddress, GROUP_CONCAT(c.classification) AS classifications
    FROM item i
    JOIN establishment e ON i.estab_id = e.estab_id
    LEFT JOIN itemclass c ON c.item_id = i.item_id
    WHERE i.estab_id = ?
    GROUP BY i.item_id
  `;
  db.query(sql, [estab_id], (err, data) => {
    if (err) return res.json(err);

    // Convert classifications string to array
    const formattedData = data.map((item) => ({
      ...item,
      classifications: item.classifications
        ? item.classifications.split(",")
        : [], // Split into array or return empty array if null
    }));

    console.log("Query results:", formattedData);
    return res.json(formattedData);
  });
});

app.get(`/:estab_id/estab`, (req, res) => {
  const { estab_id } = req.params;
  const sql =
    "SELECT e.estab_id, e.estab_name, e.address, COALESCE(AVG(er.rating), 0) AS avg_rating, ec.contact FROM establishment e LEFT JOIN estabreview er ON e.estab_id = er.estab_id LEFT JOIN estabcontact ec ON e.estab_id = ec.estab_id WHERE e.estab_id = ? GROUP BY e.estab_id";
  db.query(sql, [estab_id], (err, data) => {
    if (err) return res.json(err);
    // console.log(data);
    return res.json(data);
  });
});

// read or search items
app.post("/:estab_id/search", (req, res) => {
  const { name } = req.body;
  const { estab_id } = req.params;
  // console.log("Search term: ", estab_id, search_term);
  const sql =
    "SELECT i.name, i.price, i.description, i.image_link, COALESCE(AVG(ir.rating), 0) AS avg_rating, ic.classification FROM item i LEFT JOIN establishment e ON i.estab_id = e.estab_id LEFT JOIN itemreview ir ON i.item_id = ir.item_id LEFT JOIN itemclass ic ON ic.item_id = i.item_id WHERE LOWER(i.name) LIKE LOWER(?) AND i.estab_id = ? GROUP BY i.item_id";
  db.query(sql, [`%${name}%`, estab_id], (err, data) => {
    if (err) return res.status(500).json({ error: err });
    console.log("Query results:", data);
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

app.get(`/:estab_id/:item_id`, (req, res) => {
  const { estab_id, item_id } = req.params;
  const sql =
    "SELECT e.estab_id, i.name, i.description, i.price, COALESCE(AVG(ir.rating), 0) AS avg_rating, e.estab_name FROM item i LEFT JOIN establishment e on i.estab_id = e.estab_id LEFT JOIN itemreview ir ON i.item_id = ir.item_id WHERE e.estab_id = ? AND i.item_id = ? GROUP BY i.item_id";
  db.query(sql, [estab_id, item_id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

/*************** ITEM REVIEW TABLE ***************/

// create or add food review
app.post("/:item_id/reviews", (req, res) => {
  const { user_id, rating, comment } = req.body;
  const { item_id } = req.params;

  const insertReviewSql =
    "INSERT INTO itemreview (user_id, item_id, rating, comment) VALUES (?, ?, ?, ?)";
  db.query(
    insertReviewSql,
    [user_id, item_id, rating, comment],
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      return res.status(201).json({ message: "Review added successfully" });
    }
  );
});

// read or get all reviews
app.get("/:item_id/reviews", (req, res) => {
  const { item_id } = req.params;

  const fetchReviewsSql = "SELECT * FROM itemreview WHERE item_id = ?";
  db.query(fetchReviewsSql, [item_id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    return res.json(results);
  });
});

// update review
app.put("/:item_id/reviews/", (req, res) => {
  const { rating, comment } = req.body;
  const { item_id } = req.params;

  // assuming the review is uniquely identified by user_id, item_id, date, and time
  const { user_id } = req.body;
  const currentDate = new Date().toISOString().slice(0, 10);
  const currentTime = new Date().toISOString().slice(11, 19);

  const updateReviewSql = `
    UPDATE itemreview 
    SET rating = ?, comment = ?, date = ?, time = ? 
    WHERE user_id = ? AND item_id = ? AND date = ? AND time = ?
  `;
  db.query(
    updateReviewSql,
    [
      rating,
      comment,
      currentDate,
      currentTime,
      user_id,
      item_id,
      currentDate,
      currentTime,
    ],
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      return res.json({ message: "Review updated successfully" });
    }
  );
});

// delete review
app.delete("/:item_id/reviews/", (req, res) => {
  const { item_id } = req.params;

  // assuming the review is uniquely identified by user_id, item_id, date, and time
  const { user_id } = req.body;
  const currentDate = new Date().toISOString().slice(0, 10);
  const currentTime = new Date().toISOString().slice(11, 19);

  const deleteReviewSql = `
    DELETE FROM itemreview 
    WHERE user_id = ? AND item_id = ? AND date = ? AND time = ?
  `;
  db.query(
    deleteReviewSql,
    [user_id, item_id, currentDate, currentTime],
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      return res.json({ message: "Review deleted successfully" });
    }
  );
});

app.listen(3001, () => {
  console.log("Listening to port 3001");
});
