const router = require('express').Router();
const { body } = require('express-validator/check');
const authController = require('../controllers/authController');
const User = require('../models/User');

router.post('/signup', [
    body('nickname')
        .trim()
        .isLength({ max: 40 })
        .withMessage("Nickname must be less than 40 symbols!")
        .custom((value, { req }) => {
            return User.findOne({ nickname: value })
                .then((user) => {
                    if (user) {
                        return Promise.reject('Username already exists!');
                    }
                })
        }),
    body('email').isEmail()
        .withMessage('Please enter a valid email!')
        .custom((value, { req }) => {
            return User.findOne({ email: value })
                .then((user) => {
                    if (user) {
                        return Promise.reject('Email address already exists!');
                    }
                })
        }),
    body('password')
        .trim()
        .isLength({ max: 40 })
], authController.signUp);

router.post('/signin', authController.signIn);

router.post('/user', authController.findUserByName);

router.post('/email', authController.findIfEmailExists);

module.exports = router;