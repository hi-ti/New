const jwt = require('jsonwebtoken');

const JWTDecoder = (req, res, next) => {
    try {
        // Get token from header if it exists. If not, return a 401 Unauthorized error.
        const {token} = req.body;
        if  (!token) return res.status(403).json({message: "no token"});

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if(err) return res.status(403).json("Invalid token");
            req.user = decoded;
            console.log(req.user);
            next();
        })
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ message: "Internal Server Error" });
    }
};
module.exports = JWTDecoder;