

const express = require("express");
const router = express.Router();
const db = require("../db");

console.log("addresses.js loaded");

// POST /api/addresses
router.post("/", (req, res) => {
  const { customerId, addressLine, city, state, pincode } = req.body;

  if (!customerId || !addressLine || !city || !state || !pincode) {
    return res.status(400).json({ error: "All address fields are required" });
  }

  const sql = `
    INSERT INTO addresses (customerId, addressLine, city, state, pincode)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.run(sql, [customerId, addressLine, city, state, pincode], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({ message: "Address created successfully", addressId: this.lastID });
  });
});

// GET /api/addresses/:id
router.get("/:id", (req, res) => {
  const addressId = req.params.id;

  db.get("SELECT * FROM addresses WHERE id = ?", [addressId], (err, address) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!address) {
      return res.status(404).json({ error: "Address not found" });
    }
    res.json(address);
  });
});


// PUT /api/addresses/:id
router.put("/:id", (req, res) => {
  const addressId = req.params.id;
  const { addressLine, city, state, pincode } = req.body;

  const sql = `
    UPDATE addresses
    SET addressLine = ?, city = ?, state = ?, pincode = ?
    WHERE id = ?
  `;

  db.run(sql, [addressLine, city, state, pincode, addressId], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: "Address not found" });
    }
    res.json({ message: "Address updated successfully" });
  });
});


// DELETE /api/addresses/:id
router.delete("/:id", (req, res) => {
  const addressId = req.params.id;

  db.run("DELETE FROM addresses WHERE id = ?", [addressId], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: "Address not found" });
    }
    res.json({ message: "Address deleted successfully" });
  });
});

module.exports = router;
