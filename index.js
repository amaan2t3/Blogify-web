const path = require('path')
const express = require('express');

const app = express();
const PORT = 8000;

const userRoutes = require("./routes/userRoutes");


// Middleware to parse JSON bodies
app.set("view engine", "ejs");
app.set("views",path.resolve("./views")); 

// // Import user routes

app.get("/", (req, res) => {
    res.render("home");
});
app.use("/users", userRoutes)



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 