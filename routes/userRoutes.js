 const {express , Router }= require('express');
const User = require('../models/userModels');


const router = Router();

 
// Get all users

router.get("/sigin" , (req , res)=>{
    return res.render("sigin");

});

    router.get("/signup" , (req , res)=>{
        return res.render("signup");
    });
 

router.post("/signup" , async (req , res)=>{
    const {fullName , email , password} = req.body;

    await User.create({
        fullName,
        email,
        password
    });

    return res.redirect("/");

});

 module.exports = router;