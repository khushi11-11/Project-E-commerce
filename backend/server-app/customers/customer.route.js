const express = require('express');
const customerRoute = express.Router();
const bodyparser = require("body-parser");
const Customer = require("./customer.model");
var fs = require("fs");
const multer = require("multer");

// Customer registration code
customerRoute.route('/register').post((req, res) => {
    var customer = new Customer(req.body);
    customer.save()
        .then(customer => {
            if (customer) {
                res.send("Registration Successful !!");
            } else {
                res.status(500).send("Registration Failed..");
            }
            res.end();
        })
        .catch(err => {
            res.status(500).send("Error occurred during registration: " + err.message);
            res.end();
        });
});

// Get image route
customerRoute.route('/getimage/:cpicname').get((req, res) => {
    const imagePath = "/Users/Khushi Verma/Documents/Project E-commerce/backend/server-app/customers/customerimages/" + req.params.cpicname;
    res.sendFile(imagePath, (err) => {
        if (err) {
            res.status(404).send("Image not found");
        }
    });
});

// Image save route
const st = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "/Users/Khushi Verma/Documents/Project E-commerce/backend/server-app/customers/customerimages");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage: st });
customerRoute.route('/savecustomerimage').post(upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    res.json({ message: 'File uploaded successfully!' });
    alert("File uploaded successfully!")
});
 
// Get customer count
customerRoute.route('/getcustomercount').get((req, res) => {
    Customer.find()
        .then(customer => {
            res.send(customer);
        })
        .catch(err => {
            res.status(500).send("Error occurred while fetching customer count: " + err.message);
        });
});

// Customer login
customerRoute.route('/login').post((req, res) => {
    var id = req.body.CUserId;
    var pass = req.body.CUserPass;

    Customer.findOne({ $and: [{ "CUserId": id }, { "CUserPass": pass }] })
        .then(customer => {
            if (customer) {
                res.send(customer);
            } else {
                res.status(404).send("Invalid user ID or password.");
            }
            res.end();
        })
        .catch(err => {
            res.status(500).send("Something went wrong: " + err.message);
            res.end();
        });
});

// Get customer details by ID
customerRoute.route('/getcustomerdetails/:cid').get((req, res) => {
    var id = req.params.cid;
    Customer.findOne({ "Cid": id })
        .then(customer => {
            if (customer) {
                res.send(customer);
            } else {
                res.status(404).send("Customer not found.");
            }
            res.end();
        })
        .catch(err => {
            res.status(500).send("Error fetching customer details: " + err.message);
            res.end();
        });
});

// Get customer list
customerRoute.route('/getcustomerlist').get((req, res) => {
    Customer.find()
        .then(customers => {
            res.send(customers);
            res.end();
        })
        .catch(err => {
            res.status(500).send("Error fetching customer list: " + err.message);
            res.end();
        });
});

module.exports = customerRoute;
