const { express, Router } = require('express');
const User = require('../models/userModels');


const router = Router();


// Get all users

router.get("/signin", (req, res) => {
    return res.render("signin");

});



router.get("/signup", (req, res) => {
    return res.render("signup");
});


router.post("/signup", async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
        const user = await User.create({
            fullName,
            email,
            password
        });

        // Set session after signup
        req.session.userId = user._id;
        req.session.user = user;

        return res.redirect("/");
    } catch (err) {
        console.log(err);
        res.render("signup", { error: err.message });
    }
});

router.post("/signin", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.render("signin", { error: "Invalid email or password" });
        }

        // Verify password
        const userPassword = user.password;
        const { createHmac } = require("crypto");
        const hashedPassword = createHmac("sha256", user.salt)
            .update(password)
            .digest("hex");

        if (hashedPassword !== userPassword) {
            return res.render("signin", { error: "Invalid email or password" });
        }

        // Set session



        return res.redirect("/");
    } catch (err) {
        console.log(err);
        res.render("signin", { error: err.message });
    }
});

module.exports = router;