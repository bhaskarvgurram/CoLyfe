const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const home_router = require('./routes/home');
const task_router = require('./routes/task');
<<<<<<< HEAD
const task_assignment_router = require('./routes/taskAssignment');
=======
const orders_router = require('./routes/orders');
>>>>>>> c514579d2ad8eab3ff41d491624e8982efca9e52
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
<<<<<<< HEAD
app.use('/assignment', task_assignment_router);
=======
app.use('/list', orders_router);

>>>>>>> c514579d2ad8eab3ff41d491624e8982efca9e52
app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;
