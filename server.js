const express = require("express");
require("dotenv").config();
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const causeRoutes = require("./routes/causeRoutes");
const goalRoutes = require("./routes/goalRoutes");
const checkinRoutes = require("./routes/checkinRoutes");
const { connectToDb } = require("./db");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/causes", causeRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/checkins", checkinRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Connect to the database
connectToDb();
