

const express = require("express");
const router = express.Router();
const db = require("../db");

console.log("customers.js loaded");


// POST /api/customers
router.post("/", (req, res) => {
  console.log("POST /api/customers hit");
  const { firstName, lastName, phone, city, state, pincode, addresses } = req.body;

  if (!firstName || !lastName || !phone || !city || !state || !pincode) {
    return res.status(400).json({ error: "All customer fields are required" });
  }

  const sql = `
    INSERT INTO customers (firstName, lastName, phone, city, state, pincode)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.run(sql, [firstName, lastName, phone, city, state, pincode], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const customerId = this.lastID;

    if (Array.isArray(addresses) && addresses.length > 0) {
      const addressSql = `
        INSERT INTO addresses (customerId, addressLine, city, state, pincode)
        VALUES (?, ?, ?, ?, ?)
      `;
      addresses.forEach((addr) => {
        db.run(addressSql, [customerId, addr.addressLine, addr.city, addr.state, addr.pincode]);
      });
    }

    res.json({ message: "Customer created successfully", customerId });
  });
});


// GET /api/customers/:id
router.get("/:id", (req, res) => {
  const customerId = req.params.id;

  const sqlCustomer = "SELECT * FROM customers WHERE id = ?";
  db.get(sqlCustomer, [customerId], (err, customer) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    const sqlAddresses = "SELECT * FROM addresses WHERE customerId = ?";
    db.all(sqlAddresses, [customerId], (err, addresses) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      customer.addresses = addresses;
      res.json(customer);
    });
  });
});


// GET /api/customers
router.get("/", (req, res) => {
  const sqlCustomers = "SELECT * FROM customers";

  db.all(sqlCustomers, [], (err, customers) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (customers.length === 0) {
      return res.json([]);
    }

    const sqlAddresses = "SELECT * FROM addresses";
    db.all(sqlAddresses, [], (err, addresses) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      customers.forEach((customer) => {
        customer.addresses = addresses.filter((a) => a.customerId === customer.id);
      });

      res.json(customers);
    });
  });
});


// PUT /api/customers/:id
router.put("/:id", (req, res) => {
  const customerId = req.params.id;
  const { firstName, lastName, phone, city, state, pincode, addresses } = req.body;

  const sql = `
    UPDATE customers
    SET firstName = ?, lastName = ?, phone = ?, city = ?, state = ?, pincode = ?
    WHERE id = ?
  `;

  db.run(sql, [firstName, lastName, phone, city, state, pincode, customerId], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    db.run("DELETE FROM addresses WHERE customerId = ?", [customerId], (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (Array.isArray(addresses) && addresses.length > 0) {
        const addressSql = `
          INSERT INTO addresses (customerId, addressLine, city, state, pincode)
          VALUES (?, ?, ?, ?, ?)
        `;
        addresses.forEach((addr) => {
          db.run(addressSql, [customerId, addr.addressLine, addr.city, addr.state, addr.pincode]);
        });
      }

      res.json({ message: "Customer updated successfully" });
    });
  });
});


// DELETE /api/customers/:id
router.delete("/:id", (req, res) => {
  const customerId = req.params.id;


  db.run("DELETE FROM addresses WHERE customerId = ?", [customerId], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    db.run("DELETE FROM customers WHERE id = ?", [customerId], function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: "Customer not found" });
      }

      res.json({ message: "Customer deleted successfully" });
    });
  });
});

module.exports = router;
