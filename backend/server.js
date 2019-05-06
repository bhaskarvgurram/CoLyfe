const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const home_router = require('./routes/home');
const task_router = require('./routes/task');
const orders_router = require('./routes/orders');
const port = process.env.PORT || 5000;
const cors = require('cors');
require('./db');

app.use(bodyParser.json());
app.use(cors());


app.use(
    bodyParser.urlencoded({
        parameterLimit: 100000,
        limit: '50mb',
        extended: true
    })
);

app.use('/home', home_router);
app.use('/task', task_router);
app.use('/list', orders_router);

app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;
