const express = require('express');
const port = 3000;
const app = express();
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth-router');
app.use(bodyParser.json());

require('./database/db')();

app.use('/auth', authRoutes);


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);

})


