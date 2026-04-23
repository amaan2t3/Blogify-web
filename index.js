const path = require('path')
const express = require('express');

const app = express();
const PORT = 8000;

const userRoutes = require("./routes/userRoutes");

const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/blogifyDB").then((e) => { 
    console.log("Connected to MongoDB")
 }).catch((err) => {
    console.log("Error connecting to MongoDB:", err);
    });



// Middleware to parse JSON bodies
app.set("view engine", "ejs");
app.set("views",path.resolve("./views")); 
app.use(express.static("public"));

app.use(express.urlencoded({ extended: false}));

// // Import user routes

app.get("/", (req, res) => {
    res.render("home");
});
app.use("/users", userRoutes)



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 