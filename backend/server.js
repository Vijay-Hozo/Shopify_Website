require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectToDb = require("./Config/db");
const productRoutes = require("./Routes/ProductRoute");
const userRoutes = require("./Routes/UserRoute");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/", productRoutes);
app.use("/", userRoutes);

connectToDb();
app.get("/", (req, res) => {
  res.send("Welcome to the backend server!");
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
