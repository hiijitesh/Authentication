require("dotenv").config();
const jwt = require("jsonwebtoken");

function verifyToken(token) {
    let decoded = {};
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, paramDecoded) => {
        if (err) {
            return;
        }
        decoded = paramDecoded;
    });
    return decoded;
}

function isAuthenticated(req, res, next) {
    const authorizationToken = req.headers.authorization;
    let token;
    // console.log("TOKEN========", authorizationToken);

    if (authorizationToken) {
        token = authorizationToken.split(" ")[1];
    }
    console.log("token ======", token);

    if (!token) {
        return res.status(401).json({
            error: "You are not authorized",
        });
    }

    const decoded = verifyToken(token);

    if (Object.keys(decoded).length === 0) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }

    req.user = decoded;
    next();
}

module.exports = isAuthenticated;
