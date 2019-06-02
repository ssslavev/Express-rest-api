const User = require('../models/User');
const encryption = require('../utils/encryption');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator/check');


function validateUser(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({
            message: 'Validation errors',
            errors: errors.array()
        })

        return false;
    }

    return true;
}

module.exports = {

    signUp: (req, res) => {
        if (validateUser(req, res)) {

            const { email, password, nickname, phone, country } = req.body;
            const salt = encryption.generateSalt();
            const hashedPassword = encryption.generateHashedPassword(salt, password);

            User.create({
                email,
                hashedPassword,
                nickname,
                salt,
                phone,
                country
            }).then((user) => {
                res.status(201)
                    .json({ message: "You are registered successfully!", userId: user._id });
            })
                .catch((error) => {
                    res.status(500)
                        .json({ message: 'Internal server error!' });
                });
        }
    },

    signIn: (req, res) => {
        const { nickname, password } = req.body;

        User.findOne({ nickname: nickname })
            .then((user) => {
                if (!user) {
                    return res.status(404).json({ message: 'User Not Found!' });
                }

                if (!user.authenticate(password)) {
                    return res.status(400).json({ message: 'Password not match' });
                }

                const token = jwt.sign({
                    nickname: user.nickname,
                    userId: +user._id
                }, 'superescret', { expiresIn: '1h' });

                res.status(200).json({ message: "You are logged in!", token, userId: user._id, nickname: user.nickname });
            })
            .catch((err) => {
                res.status(500).json({ message: "Internal server error", err });
            })
    },


    findUserByName: (req, res) => {

        const { nickname } = req.body;

        User.findOne({ nickname: nickname })
            .then((user) => {

                if (user) {
                    res.status(200).json({ message: "User was found!", status: true, user });
                } else {
                    res.status(200).json({ message: "User not found", status: false });
                }
            });
    },

    findIfEmailExists: (req, res) => {

        const { email } = req.body

        User.findOne({ email: email })
            .then((user) => {
                if (user) {
                    res.status(200).json({ message: "Email is already in use!", status: true });
                } else {
                    res.status(200).json({ message: "Email is free!", status: false });
                }
            })

    }


}