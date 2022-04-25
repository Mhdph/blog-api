const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();
const authRoute = require("./routes/auth");

dotenv.config();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to mongodb"))
  .catch((err) => console.log("Could not connect to mongodb"));

app.use("/api/auth", authRoute);

app.listen("5000", () => {
  console.log("Backend Is Runing");
});
