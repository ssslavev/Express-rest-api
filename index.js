const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 3000;
const app = express();
app.use(cors({ credentials: true, origin: true }));
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth-router');
app.use(bodyParser.json());



app.use('/api', authRoutes);
require('./database/db')();


app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({ message: message });
    next()
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);

})


