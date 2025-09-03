// db.js
const sqlite3 = require("sqlite3");
const path = require("path");

const dbFile = path.join(__dirname, "qwipo.db");

const db = new sqlite3.Database(dbFile, (err) => {
  if (err) {
    console.log("Error opening database:", err.message);
  } else {
    console.log("Database file:", dbFile);
    console.log("Database opened/created successfully");
  }
});

db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS customers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstName TEXT,
      lastName TEXT,
      phone TEXT,
      city TEXT,
      state TEXT,
      pincode TEXT
    )`,
    (err) => {
      if (err) console.log("Error creating customers table:", err.message);
      else console.log("customers table ready");
    }
  );

  db.run(
    `CREATE TABLE IF NOT EXISTS addresses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customerId INTEGER,
      addressLine TEXT,
      city TEXT,
      state TEXT,
      pincode TEXT,
      FOREIGN KEY (customerId) REFERENCES customers(id)
    )`,
    (err) => {
      if (err) console.log("Error creating addresses table:", err.message);
      else console.log("addresses table ready");
    }
  );
});

module.exports = db;
