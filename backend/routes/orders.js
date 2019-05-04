var express = require('express');
const orders_router = express.Router();
const Orders = require('./../models/Orders');
const mongoose = require("mongoose");

const _ = require('lodash');

// creates a new list

orders_router.post('/create', (req, res) => {
    console.log('req.body ', req.body);     //home_id, list_title
    Orders.create({
        _id: new mongoose.Types.ObjectId(),
        home_id: req.body.home_id,
        list_title: req.body.list_title
    })
    .then(row=>{
        console.log("data inserted into the database", row);
        res.status(200).send(row);
    })
    .catch(err=>{
        console.log("error in query", err);
        res.status(400);
    })
});

//creates items in a list.. where list_id=list_id

orders_router.post('/item/create', (req, res) => {
    console.log('req.body ', req.body); //home_id, list_id

    let new_item={
        _id:new mongoose.Types.ObjectId(),
        item_name: req.body.item_name,
        item_qty:req.body.item_qty,
        item_sharedby:req.body.item_sharedby,
        data:Date.now()
    }
    console.log("new_item: ",new_item);

    Orders.findOneAndUpdate({
        _id:req.body.list_id
    },{
        $push:{
            order_details:new_item
        }
    })
    .then(row=>{
        console.log("data inserted into the database", row);
        res.status(200).send(row);
    })
    .catch(err=>{
        console.log("error in query", err);
        res.status(400);
    })
});

//displays all lists where home_id=home_id

orders_router.post('/display', (req, res) => {
    console.log('req.body ', req.body); //home_id, list_id
//req.query
   Orders.find({
       home_id:req.body.home_id
   })
    .then(row=>{
        console.log("data response", row);
        res.status(200).send(row);
    })
    .catch(err=>{
        console.log("error in query", err);
        res.status(400);
    })
});

//displays all items where list_id=list_id and home_id=home_id

orders_router.post('/item/display', (req, res) => {
    console.log('req.body ', req.body); //home_id, list_id

    Orders.findById({
       _id:req.body.list_id
   })
    .then(row=>{
        console.log("data response", row);
        res.status(200).send(row);
    })
    .catch(err=>{
        console.log("error in query", err);
        res.status(400);
    })
});

module.exports = orders_router;