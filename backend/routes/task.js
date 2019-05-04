var express = require('express');
const task_router = express.Router();
const Home = require('./../models/Home');
const Person = require('./../models/Person');
const Task = require('./../models/Task');

const _ = require('lodash');

// gets tasks associated with a home
task_router.get('/all', async (req, res) => {
    console.log('Ing get ');


    // get daily, weekly and monthly tasks, and their info


    res.send('Success');
});


// creates a new task
task_router.post('/', async (req, res) => {
    console.log('IN post of task');
    let task_name = req.body.task_name;
    let person_ids = req.body.person_ids;
    let rotation_type = req.body.rotation_type; // DAILY, WEEKLY, MONTHLY
    let home_id = req.body.home_id;
    let startDate = req.body.startDate;
    console.log(req.body);
    // rotation
    let rotation_day = null;
    if (rotation_type === "WEEKLY") {
        rotation_day = req.body.rotation_day; //MONDAY, TUESDAY, WEDNESDAY,...
    }

    if (rotation_day === "MONTHLY") {
        rotation_day = req.body.rotation_day;  // 1,2,3,....30,31
    }

    if (startDate === "NOW") {
        startDate = new Date();

        // create Task assignments now
    }

    let task = new Task({
        home_id: home_id,
        name: task_name,
        rotation_type: rotation_type,
        rotation_day: rotation_day,
        people: person_ids,
        start: startDate
    });


    task.save();
    console.log('Created New Task');

    res.status(200).send('Success');
});


function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}


function assignTasks() {
    // for the task, 
    // depending on the type
}

module.exports = task_router;