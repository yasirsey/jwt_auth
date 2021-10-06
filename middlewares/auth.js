const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {

    try {
        const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1]

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

        console.log(token)

        req.userData = decodedToken

        next()
    } catch (err) {
        console.log(err);
        return res.status(401).json({error: 'Auth failed.'})
    }
};

module.exports = verifyToken