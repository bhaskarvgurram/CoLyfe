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
    let home_name = req.body.home;

    let passcode = '';

    for (var i = 0; i < 6; i++) {
        passcode = passcode + toString(getRandomInt(10));
    };

    console.log('Pass code ', passcode);
    let home = await new Home({
        name: home_name,
        passcode: passcode
    })

    await home.save();
    console.log('Created home successfully');

    for (var i = 0; i < persons.length; i++) {
        console.log('Adding person ', persons[i].name, ' ', persons[i].email);
        let person = await new Person({
            name: persons[i].name,
            email: persons[i].email,
            house_id: home.id
        });
        await person.save();

        console.log('Person created ', person.name);
    }
    res.status(200).send({
        "message": "Success",
        "home_id": home.id
    });
});

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

module.exports = home_router;