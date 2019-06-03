const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const connectionString = 'mongodb+srv://ssslavev:Taekwondo89$@notifications-cjvuz.gcp.mongodb.net/codix-rest-api-db?retryWrites=true';

module.exports = () => {
    mongoose.connect(connectionString, {
        useNewUrlParser: true
    });

    const db = mongoose.connection;
    db.once('open', err => {
        if (err) {
            console.log(err);

        };

        console.log('Database ready');
    });

    db.on('error', err => {
        console.log(err);
    });
}