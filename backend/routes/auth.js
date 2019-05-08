var express = require('express');
const auth_router = express.Router();
const Home = require('./../models/Home');
const Person = require('./../models/Person');

const _ = require('lodash');

// gets a home and it's data
auth_router.get('/', async (req, res) => {
    console.log('Ing get ');
    res.send('Success');
});

module.exports = auth_router;