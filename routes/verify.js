const jwt = require('jsonwebtoken');

const SimpleVerify = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(authHeader) {
        const token = authHeader.split(" ")[1];

        jwt.verify(token, process.env.JWT_SEC, (err, recover) => {
            if(err){
                return res.status(403).json("Toke is invalid")
            }
            req.user = recover;
            next();
        })
    }else {
        res.status(401).json("not authorized !!!");
    }
};

const VerifyyTokenAndAuth = (req, res, next) => {
    SimpleVerify(req, res, () => {
        console.log(req.user)
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }else {
            res.status(403).json(
                "Invalid Token action not allowed.."
            );
        }
    })
};

const VerifyyTokenAndAdmin = (req, res, next) => {
    SimpleVerify(req, res, () => {
        if(req.user.isAdmin){
            next();
        }else {
            res.status(403).json(
                "Invalid Token, not allowed by admin.."
            );
        }
    })
};

module.exports = {
    SimpleVerify,
    VerifyyTokenAndAuth,
    VerifyyTokenAndAdmin
}