const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");

dotenv.config();

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// static file
app.use(express.static(path.join(__dirname, "../public")));

// view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

// connect mongodb
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB connected");
})
.catch(err => console.log(err));

// routes
app.get("/", (req, res) => {
    res.render("home");
});

// server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});