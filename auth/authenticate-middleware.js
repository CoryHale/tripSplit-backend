const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    
    if(token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if(err) {
                res.status(401).json({ message: 'Bad Token' });
            } else {
                req.user = { phone_number: decodedToken.phone_number };
                next();
            }
        });
    } else {
        res.status(400).json({ message: 'User Not Logged In' });
    }
}