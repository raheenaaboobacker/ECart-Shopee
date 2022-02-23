const Router = require('express');
const express = require('express');
const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser');
// const ls = require('local-storage')
const checkAuth = require('./../middleware/check-auth')
const localStorage1 = require('localStorage')
const productr = express.Router();
const productsdata = require('../models/productsdata');
const admindata = require('../models/admindata');
const cartdata = require('../models/cartdata');
const { default: localStorage } = require('local-storage');
const { redirect } = require('express/lib/response');
var val;
var fruits;
var total
productr.get('/buy/:id', function(req, res) {
        const id = req.params.id;
        // console.log(id)
        productsdata.findOne({
                _id: id
            })
            .then((demo) => {
                console.log(demo)
                res.render("demo", {
                    demo
                })

            })
    })
    // productr.get('/find/:qt', function(req, res) {
    //     const qt = req.params.qt;
    //     console.log(qt)
    // })
productr.get('/login', function(req, res) {
        // res.send('response from login ........')
        res.render("login", {
            val: null
        })
    })
    // productr.get('/additem', function(req, res) {
    //     res.render("add")
    // })
productr.get('/register', function(req, res) {
    res.render("register")
})


productr.post('/registerr', function(req, res) {
    var i = {
        name: req.body.name,

        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        role: req.body.role,

    }
    console.log("role is " + req.body.role);
    var admin = admindata(i);
    admin.save().then((data) => { console.log(data) });
    // productsdata.find();
    // console.log();
    res.redirect('login')
})
productr.post('/loginn', function(req, res) {
    try {


        var i = {
            username: req.body.username,
            password: req.body.password
        }

        var n = i.username;
        var p = i.password
            // console.log(p)
        admindata.findOne({
                username: n

            })
            .then((demo) => {
                if (demo) {
                    if (demo.username === n && demo.password === p) {
                        // const token = jwt.sign({
                        //     username: demo.username,
                        //     userid: demo._id

                        // }, "secretkey")
                        // res.cookie('data', token)
                        // localStorage1.setItem('data', JSON.stringify(token));
                        if (demo.role === "admin") {
                            res.redirect('/adminhome')
                        } else {
                            res.redirect('/home')
                        }

                    } else {
                        res.render("login", {
                            val: "enter correct password"
                        })

                        console.log("please register!!!!! ")
                    }
                } else {

                    console.log("server not fund")
                    res.render("login", {
                        val: "user not found"
                    })
                }
            })
    } catch (err) {
        console.log(err)
    }

    // } finally {
    //     res.render('login');
    // }
})


// productr.post('/add', function(req, res) {
//         var item = {
//                 name: req.body.name,

//                 price: req.body.price,
//                 quantity: req.body.quantity,
//                 img: req.body.img
//             }
//             // console.log(item.name);
//         if (item.name != null && item.price != null && item.img != null) {
//             var fruit = productsdata(item);
//             fruit.save().then((data) => { console.log(data) });
//             // productsdata.find();
//             // console.log();
//             res.redirect('/home')
//         }
//     })
// productr.get('/edit/:id', function(req, res) {
//         const id = req.params.id;
//         productsdata.findOne({
//                 _id: id
//             })
//             .then((demo) => {
//                 // console.log(demo)
//                 res.render("edit", {
//                     demo
//                 })

//             })
//     })
// productr.post('/update/:id', function(req, res) {
//     const id = req.params.id;
//     var item = {
//         name: req.body.name,
//         price: req.body.price,
//         quantity: req.body.quantity,
//         img: req.body.img
//     }
//     productsdata.findByIdAndUpdate({
//                 _id: id
//             },
//             item)
//         .then((demo) => {
//             // console.log(demo)
//             res.redirect('/home')

//         })
// })
// productr.post('/delete/:id', function(req, res) {
//     const id = req.params.id;
//     var item = {
//         name: req.body.name,
//         price: req.body.price,
//         quantity: req.body.quantity,
//         img: req.body.img
//     }
//     productsdata.findByIdAndDelete({
//                 _id: id
//             },
//             item)
//         .then((demo) => {

//             res.redirect('/home')

//         })

// })
productr.get('/cartshow', function(req, res) {
        cartdata.find()
            .then((data) => {
                console.log("cart data is" +
                    data)
                res.render("cart", {
                    data,

                })
            })

    })
    // productr.get("cartShow", (req, res) => {
    //     res.render("login")
    // })
productr.post('/find/:id', function(req, res) {
    const qt = req.body.quantity
        // console.log(qt)
    const id = req.params.id;

    productsdata.findOne({
            _id: id
        })
        .then((demo) => {
            total = demo.price * qt;
            // console.log(total)
            var i = {
                prdname: demo.name,
                prdprice: demo.price,
                prdimg: demo.img,
                qt: qt,
                amount: total
            }
            var cart = cartdata(i);
            cart.save().then((data) => {
                // console.log("Added to cart: " + data)
                res.redirect('/products/cartshow')
            });


        })

})
productr.post('/prdDelete/:id', function(req, res) {
        const id = req.params.id;
        console.log(id)


        cartdata.findByIdAndDelete(id)
            .then((demo) => {
                console.log("deleted item" + demo)
            })
        res.redirect('/products/cartshow')
    })
    // productr.post('/prdbuy', (req, res) => {
    //     cartdata.
    // })
module.exports = productr;