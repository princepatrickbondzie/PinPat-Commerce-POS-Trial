require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

require("./config/dbConnect");
const PORT = process.env.PORT || 7000;

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api", userRoutes, productRoutes);

app.listen(PORT, () => console.log("Covering the nations book hole...."));