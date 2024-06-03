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
  password: "qwerty",
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
    "SELECT user_id FROM user WHERE user_name = ? AND password = PASSWORD(?)";
  db.query(getUserSql, [user_name, password], (err, results) => {
    if (err) return res.status(500).json({ error: err });

    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const user_id = results[0].user_id; // extract the user_id from the results

    return res.status(200).json({ message: "Login successful", user_id });
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
  const { estab_name, address, contacts, image_link, user_id } = req.body;

  // Check if the establishment already exists
  const checkEstabSql =
    "SELECT * FROM establishment WHERE estab_name = ? AND address = ?";
  db.query(checkEstabSql, [estab_name, address], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    console.log(estab_name, address, contacts, image_link);
    if (results.length > 0) {
      return res.status(400).json({ error: "Establishment already exists" });
    }

    // Insert the new establishment
    const insertEstabSql =
      "INSERT INTO establishment (estab_name, image_link, address) VALUES (?, ?, ?)";
    db.query(
      insertEstabSql,
      [estab_name, image_link, address],
      (err, results) => {
        if (err) {
          return res.status(500).json({ error: err });
        }

        const estab_id = results.insertId;

        // Insert contact numbers if provided
        if (contacts && contacts.length > 0) {
          const contactValues = contacts.map((contact) => [estab_id, contact]);
          const insertContactSql =
            "INSERT INTO estabcontact (estab_id, contact) VALUES ?";
          db.query(insertContactSql, [contactValues], (err, results) => {
            if (err) {
              return res.status(500).json({ error: err });
            }

            // Insert user_id and estab_id into userestab table
            const insertUserEstabSql =
              "INSERT INTO userestab (user_id, estab_id) VALUES (?, ?)";
            db.query(
              insertUserEstabSql,
              [user_id, estab_id],
              (err, results) => {
                if (err) {
                  return res.status(500).json({ error: err });
                }
                return res
                  .status(201)
                  .json({ message: "Establishment added successfully" });
              }
            );
          });
        } else {
          // Insert user_id and estab_id into userestab table if there are no contacts
          const insertUserEstabSql =
            "INSERT INTO userestab (user_id, estab_id) VALUES (?, ?)";
          db.query(insertUserEstabSql, [user_id, estab_id], (err, results) => {
            if (err) {
              return res.status(500).json({ error: err });
            }
            return res
              .status(201)
              .json({ message: "Establishment added successfully" });
          });
        }
      }
    );
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

// create or add establishment review
app.post("/:estab_id/review", (req, res) => {
  const { user_id, estab_id, rating, comment } = req.body;

  // insert item into the item table
  const insertEstReviewSql =
    "INSERT INTO estabreview(user_id, estab_id, rating, comment) VALUES (?, ?, ?, ?)";
  db.query(
    insertEstReviewSql,
    [user_id, estab_id, rating, comment],
    (err, results) => {
      console.log(user_id, estab_id, rating, comment);
      if (err) return res.status(500).json({ error: err });
      return res.status(201).json({ message: "Review added successfully" });
    }
  );
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
    SELECT i.*, e.estab_name AS establishmentName, i.image_link as imageLink, e.address AS establishmentAddress, COALESCE(AVG(ir.rating), 0) AS avg_rating, GROUP_CONCAT(DISTINCT c.classification) AS classifications
    FROM item i
    JOIN establishment e ON i.estab_id = e.estab_id
    LEFT JOIN itemclass c ON c.item_id = i.item_id
    LEFT JOIN itemreview ir ON i.item_id = ir.item_id
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

    // console.log("Query results:", formattedData);
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

app.get(`/:estab_id/estreviews`, (req, res) => {
  const { estab_id } = req.params;
  const { sort } = req.query;
  const sql = `select user_id, user_name, date, time, rating, comment from estabreview natural join user where estab_id= ? order by date ${sort}, time ${sort}`;

  // if (req.query.sort === "DESC") {
  //   sql += " ORDER BY date DESC, time DESC";
  // } else {
  //   sql += " ORDER BY date ASC, time ASC";
  // }
  db.query(sql, [estab_id], (err, data) => {
    if (err) return res.json(err);
    console.log(data);
    return res.json(data);
  });
});

app.get(`/:estab_id/estmonthreviews`, (req, res) => {
  const { estab_id } = req.params;
  const sql =
    "select user_id, user_name, date, time, rating, comment from estabreview natural join user where estab_id= ? and date >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH)";
  db.query(sql, [estab_id], (err, data) => {
    if (err) return res.json(err);
    console.log(data);
    return res.json(data);
  });
});

app.get("/:item_id/itemreviews", (req, res) => {
  const { item_id } = req.params;
  const { sort } = req.query;
  let sql = `SELECT user_id, user_name, date, time, rating, comment FROM itemreview natural join user WHERE item_id = ? order by date ${sort}, time ${sort}`;

  // if (sort === "DESC") {
  //   sql += " ORDER BY date DESC, time DESC";
  // } else {
  //   sql += " ORDER BY date ASC, time ASC";
  // }

  db.query(sql, [item_id], (err, data) => {
    if (err) return res.json(err);
    console.log(data);
    return res.json(data);
  });
});

app.get(`/:item_id/itemmonthreviews`, (req, res) => {
  const { item_id } = req.params;
  const sql =
    "select user_id, user_name, date, time, rating, comment from itemreview natural join user where item_id= ? and date >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH)";
  db.query(sql, [item_id], (err, data) => {
    if (err) return res.json(err);
    console.log(data);
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

app.get(`/:estab_id/filterClass`, (req, res) => {
  const { classification } = req.query;
  const { estab_id } = req.params;
  if (!classification) {
    return res
      .status(400)
      .json({ error: "Classification query parameter is required" });
  }
  console.log(classification);
  const classificationsArray = classification.split(",");
  const placeholders = classificationsArray.map(() => "?").join(",");
  console.log(placeholders);
  const sql = `SELECT i.*, ic.classification FROM item i JOIN itemclass ic ON i.item_id = ic.item_id WHERE i.estab_id = ? AND ic.classification IN (${placeholders})`;
  const queryParams = [estab_id, ...classificationsArray];
  db.query(sql, queryParams, (err, results) => {
    if (err) {
      console.error("Error fetching food items: ", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    return res.json(results);
  });
});

app.get(`/:estab_id/sortPrice`, (req, res) => {
  const { sort } = req.query;
  const { estab_id } = req.params;
  const sortOrder = sort === "asc" ? "ASC" : "DESC";
  const sql = `SELECT i.*, e.estab_name AS establishmentName, i.image_link as imageLink, e.address AS establishmentAddress, COALESCE(AVG(ir.rating), 0) AS avg_rating, GROUP_CONCAT(DISTINCT c.classification) AS classifications
    FROM item i
    JOIN establishment e ON i.estab_id = e.estab_id
    LEFT JOIN itemclass c ON c.item_id = i.item_id
    LEFT JOIN itemreview ir ON i.item_id = ir.item_id
    WHERE i.estab_id = ?
    GROUP BY i.item_id
    ORDER BY i.price ${sortOrder}`;
  db.query(sql, [estab_id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
/*************** ITEM REVIEW TABLE ***************/

// create or add food review
app.post("/:item_id", (req, res) => {
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

  const fetchReviewsSql =
    "select user_id, user_name, date, time, rating, comment from itemreview natural join user where item_id = ?";
  db.query(fetchReviewsSql, [item_id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    console.log(results);
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
