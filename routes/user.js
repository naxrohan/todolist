const User = require("../models/User");
const { verifyTokenAndAuthorize, verifyTokenAndAdmin } = require("./verify");

const router = require("express").Router();

// Update.
router.put("/:id",verifyTokenAndAuthorize, async (req, res) => {
    if(req.body.password){{
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.AUTH_SEC
        ).toString();
    }}

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,{
                $set: req.body
            },
            {new: true}
        );

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Delete.
router.delete("/:id", verifyTokenAndAuthorize, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);

        res.status(200).json("user account deleted...");
    } catch (error) {
        if(error) res.status(500).json(error);
    }
});

// Get user.
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const {password, ...others} = user._doc;
        res.status(200).json(others);

    } catch (error) {
        if(error) res.status(500).json(error);
    }
});

// Get All user.
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    const query = req.query.new;
    try {
        const user = query 
        ? await User.find().sort({_id: -1}).limit(5)
        : await User.find();

        res.status(200).json(user);

    } catch (error) {
        if(error) res.status(500).json(error);
    }
});


module.exports = router