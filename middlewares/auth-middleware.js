const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    console.log("AuthMiddleware has been called !!!");

    const authHeader = req.headers['authorization'];
    console.log(authHeader);

    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Access Denied.. No Token is provided !!",
        })
    }

    // Decode the Token
    try {
        var decodedTokenInfo = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log(decodedTokenInfo);

        req.userInfo = decodedTokenInfo; // Decoded token is STORED so the next middleware or route can use it
        next(); // now this will call the "/welcome" route. (only this 'next()' is enough)

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Access Denied.. No Token is provided !!",
        })
    }

    // next(); ==>> (This is not needed here, only one 'next()' is enough)
}
module.exports = authMiddleware;