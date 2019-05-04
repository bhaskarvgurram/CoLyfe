var express = require('express');
const task_router = express.Router();
const Home = require('./../models/Home');
const Person = require('./../models/Person');
const Task = require('./../models/Task');

const _ = require('lodash');

// gets task assignments associated with a task
task_router.get('/all', async (req, res) => {
    console.log('Ing get ');


    // get daily, weekly and monthly tasks, and their info


    res.send('Success');
});



function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

module.exports = task_router;