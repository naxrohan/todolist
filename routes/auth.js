const router = require("express").Router();
const jwt = require("jsonwebtoken")
const { generateAccessToken, generateRefreshToken } = require('./makeTokens');
const User = require('../models/User');
const Token = require('../models/Token');
const { VerifyyTokenAndAuth, SimpleVerify} = require('../routes/verify');
const CryptoJS = require("crypto-js");


router.post("/login", async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username: username});
        if(user) {
            const passHash = CryptoJS.AES.decrypt(
                user.password,
                process.env.AUTH_SEC
            ).toString(CryptoJS.enc.Utf8);
            passHash !== req.body.password && res.status(401).json("invalid login creds!!..1");
            
            let oldToken = await Token.findOneAndDelete({userId: user._id});

            // Generate token && no check for existing token ?
            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);
            
            let newtoken = new Token({
                tokenValue: refreshToken,
                userId: user._id
            });
            let tokenSaved = await newtoken.save();
            

            res.status(200).json({
                id: user.id, 
                username: user.username, 
                accessToken,
                refreshToken
            })
        }else {
            res.status(401).json("invalid login creds!!.2");
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post("/logout", SimpleVerify, async (req, res) => {
    const refreshToken = req.body.token;

    try {
        let removeToken = await Token.findOneAndDelete({tokenValue: refreshToken}); 
        
        res.status(200).json("logout succesfull..")
    } catch (error) {
        res.status(500).json("something went wrong..4")    
    }
});

router.post("/refresh", async (req, res) => {
    const refreshToken = req.body.token;
    try {
        if(!refreshToken) return res.status(401).json("you are not authorized!!");
            const getToken = await Token.findOne({tokenValue: refreshToken});
            if(!getToken.tokenValue) return res.status(401).json("refresh token is invalid!!");

            jwt.verify(refreshToken, process.env.JWT_REF_SEC, async (err, user) => {
                err && console.log(err);

                let removeToken = await Token.findOneAndDelete({tokenValue: refreshToken}); 

                const newAccessToken = generateAccessToken(user);
                const newRefreshToken = generateRefreshToken(user);

                const newReftoken = new Token({
                    tokenValue: newRefreshToken,
                    userId: user.id
                });
                const tokenRefSaved = await newReftoken.save();

                res.status(200).json({
                    accessToken: newAccessToken,
                    refreshToken: newRefreshToken
                });
        })
    } catch (error) {
        res.status(500).json("something went wrong..1")
    }
});


// register
router.post("/register", async (req, res) => {
    //todo : add field validation & return valid messages.
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.AUTH_SEC
        ).toString()
    });
    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json(error);
    }
});


module.exports = router