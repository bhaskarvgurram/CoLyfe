var express = require('express');
const home_router = express.home_router();
const fetch = require("node-fetch");
const _ = require('lodash');

/**
 * Asynchronously fetches the data required for populating the GDP
 * Growth graphs on the client
 */
home_router.get('/home', async (req, res) => {

});

module.exports = home_router;