const Router  =require('express').Router();
// Library
const bcrypt = require("bcrypt");
const session = require('express-session');
const passport = require("passport");


const jwt = require('jsonwebtoken')

// Model

const User =require('../Model/UserLogin');
const Rider =require('../Model/RiderLogin');

Router.post("/signup", async (req, res) => {

    try {
        let query =await User.findOne({Email: req.body.Email})
        // generate JWT auth token
        const token = query.generateJWTToken();
        // return 
        return res.status(200).json({token, status: "Success"});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
});

/* 
    Route:          /signin
    Description:    Signin with email and password
    Params:         none
    Access:         Public
    Method :        Post
*/
Router.post("/signin", async (req, res) => {
    try {
        

        const user = await UserModel.findByEmailAndPassword(req.body.credentials);

        const token = user.generateJWTToken();

        return res.status(200).json({token, status: "Success"});

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
});

/* 
    Route:          /google
    Description:    Goole Signin
    Params:         none
    Access:         Public
    Method :        GET
*/
// Router.get("/google", passport.authenticate("google", {
//         scope: [
//             "https://www.googleapis.com/auth/userinfo.profile",
//             "https://www.googleapis.com/auth/userinfo.email",
//         ],
//     })
// );

/* 
    Route:          /google/callback
    Description:    Goole Signin Callback
    Params:         none
    Access:         Public
    Method :        GET
*/
// Router.get("/google/callback", 
//     passport.authenticate("google", {failureRedirect: "/"}),
//     (req, res) => {
//         return res.redirect(`http://localhost:3000/google/${req.session.passport.user.token}`);
//     }
// );

module.exports = Router ;