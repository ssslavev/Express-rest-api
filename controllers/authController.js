const User = require('../models/User');
const encryption = require('../utils/encryption');

module.exports = {

    signUp: (req, res) => {
        if (validateUser(req, res)) {
            const { email, password, name } = req.body;
            const salt = encryption.generateSalt();
            const hashedPassword = encryption.generateHashedPassword(salt, password);

            User.create({
                email,
                hashedPassword,
                name,
                salt
            }).then((user) => {
                res.status(201)
                    .json({ message: "User created", userId: user._id });
            })
                .catch((error) => {
                    res.status(500)
                        .json({ message: 'Internal server error!' });
                });
        }
    },

    signIn: (req, res) => {

    }
}