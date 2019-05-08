var express = require('express');
const home_router = express.Router();
const Home = require('./../models/Home');
const Person = require('./../models/Person');

const _ = require('lodash');

// gets a home and it's data
home_router.get('/', async (req, res) => {
    console.log('Ing get ');
    res.send('Success');
});


// creates a new home
home_router.post('/', async (req, res) => {

    let persons = req.body.persons;
    console.log('Persons ', persons);
    let home_name = req.body.home_name;
    let account_name = req.body.account_name

    let passcode = 'H' + getRandomInt(10000).toString();

    console.log('Pass code ', passcode);
    let home = await new Home({
        name: home_name,
        passcode: passcode,
        account_name: account_name
    });

    await home.save();
    console.log('Created home successfully');
    let person_data = [];


    for (var i = 0; i < persons.length; i++) {
        console.log('Adding person ', persons[i].name, ' ', persons[i].email);
        let person = await new Person({
            name: persons[i].name,
            email: persons[i].email,
            house_id: home.id
        });
        let update = {}
        // add a key of task id in the task History, the value will store the completion count for the task
        update['weeklyCount'] = 0;
        update['dailyCount'] = 0;
        update['monthlyCount'] = 0;
        // taskHistory = Object.assign({}, taskHistory, update);
        person.taskHistory = update;
        person_data.push({
            name: person.name,
            id: person.id
        });

        await person.save();

        console.log('Person created ', person.name);
    }
    res.status(200).send({
        "message": "Success",
        "homeId": home.id,
        "personData": person_data
    });
});

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

module.exports = home_router;