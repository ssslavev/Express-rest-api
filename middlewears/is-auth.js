const jwt = require('jsonwebtoken');
module.exports = {
    isAuth: (req, res, next) => {
        const authHeader = req.get('Authorization');

        if (!authHeader) {
            return res.status(401)
                .json({ message: "Not Authorized" });
        }

        const token = authHeader.split(' ')[1];
        let decodeToken;
        try {
            decodeToken = jwt.verify(token, "superescret");
        } catch (error) {
            return res.status(401)
                .json({ message: "Token is invalid!", err });
        }

        req.userId = decodeToken.userId;
        next();

    }
}