const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, "public")))

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req,res) => {
    res.render("home");
});

const authRouter = require("./routes/authRouter");
app.use("/", authRouter)

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/quanlytusach")
.then(() => {
    console.log("Mogodb connected");
})
.catch((err) => {
    console.log(err)
})
module.exports = app;