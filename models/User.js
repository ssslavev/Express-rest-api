const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const encryption = require('../utils/encryption');
mongoose.set('useCreateIndex', true);

const userschema = new Schema({
    email: {
        type: Schema.Types.String,
        required: true

    },
    hashedPassword: {
        type: Schema.Types.String,
        required: true
    },
    nickname: {
        type: 'string',
        required: true

    },
    salt: {
        type: Schema.Types.String,
        required: true
    },
    phone: {
        type: Schema.Types.String,
        required: true
    },
    country: {
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