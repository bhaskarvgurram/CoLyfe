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

    let person_name = req.body.name;
    let person_email = req.body.email;
    let home_name = req.body.home;

    let person = await new Person({
        name: person_name,
        email: person_email
    });

    await person.save();
    console.log('Person created ', person.name);
    let passcode = '';

    for (var i = 0; i < 6; i++) {
        passcode = passcode + toString(getRandomInt(10));
    };

    console.log('Pass code ', passcode);
    let home = await new Home({
        name: home_name,
        passcode: passcode,
        createdBy: person.id
    })

    await home.save();
    console.log('Created home successfully');

    res.status(200).send('Success');
});


function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

module.exports = home_router;