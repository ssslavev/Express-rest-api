const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const encryption = require('../utils/encryption');

const userschema = new Schema({
    email: {
        type: Schema.Types.String,
        required: true
    },
    hashedPassword: {
        type: Schema.Types.String,
        required: true
    },
    name: {
        type: 'string',
        required: true
    },
    salt: {
        type: Schema.Types.String,
        required: true
    }
})

userschema.method({
    authenticate: function (password) {
        const currentHashedPass = encryption.generateHashedPassword(this.salt, password);
        return currentHashedPass === this.hashedPassword;
    }
})

module.exports = mongoose.model('User', userschema);