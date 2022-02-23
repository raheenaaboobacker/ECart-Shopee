const Router = require('express');
const express = require('express');
const adminr = express.Router();
const productsdata = require('../models/productsdata');
const admindata = require('../models/admindata');
const cartdata = require('../models/cartdata');
const { redirect } = require('express/lib/response');

var val;
var fruits;
var total;

adminr.get('/additem', (req, res) => {
    res.render("add")
})
adminr.post('/add', function(req, res) {
    var item = {
            name: req.body.name,

            price: req.body.price,
            quantity: req.body.quantity,
            img: req.body.img
        }
        // console.log(item.name);
    if (item.name != null && item.price != null && item.img != null) {
        var fruit = productsdata(item);
        fruit.save().then((data) => { console.log(data) });
        // productsdata.find();
        // console.log();
        res.redirect('/adminhome')
    }
})
adminr.get('/edit/:id', function(req, res) {
    const id = req.params.id;
    productsdata.findOne({
            _id: id
        })
        .then((demo) => {
            // console.log(demo)
            res.render("edit", {
                demo
            })

        })
})
adminr.post('/update/:id', function(req, res) {
    const id = req.params.id;
    var item = {
        name: req.body.name,
        price: req.body.price,
        img: req.body.img
    }
    console.log(item)
    productsdata.findByIdAndUpdate({
                _id: id
            },
            item)
        .then((demo) => {
            console.log(demo)
            res.redirect('/adminhome')

        })
})
adminr.post('/delete/:id', function(req, res) {
    const id = req.params.id;
    var item = {
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
        img: req.body.img
    }
    productsdata.findByIdAndDelete({
                _id: id
            },
            item)
        .then((demo) => {

            res.redirect('/adminhome')

        })

})














module.exports = adminr;