const User = require('../models/User');
const encryption = require('../utils/encryption');
const jwt = require('jsonwebtoken');

module.exports = {

    signUp: (req, res) => {
        // if (validateUser(req, res)) {
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
        // }
    },

    signIn: (req, res) => {
        const { email, password } = req.body;

        User.findOne({ email: email })
            .then((user) => {
                if (!user) {
                    return res.status(404).json({ message: 'User Not Found!' });
                }

                if (!user.authenticate(password)) {
                    return res.status(400).json({ message: 'Password not match' });
                }

                const token = jwt.sign({
                    email: user.email,
                    userId: +user._id
                }, 'superescret', { expiresIn: '1h' });

                res.status(200).json({ message: "You are logged in!", token, userId: user._id });
            })
            .catch((err) => {
                res.status(500).json({ message: "Internal server error", err });
            })
    }
}