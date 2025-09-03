
const express = require("express");
const cors = require("cors");

const db = require("./db");

const customerRoutes = require("./routes/customers");
const addressRoutes = require("./routes/addresses");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Server is working");
});

app.use("/api/customers", customerRoutes);

app.use("/api/addresses", addressRoutes);

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
