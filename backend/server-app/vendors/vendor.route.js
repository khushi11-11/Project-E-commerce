const express = require('express');
const vendorRoute = express.Router();
const bodyparser = require("body-parser");
const Vendor = require("./vendor.model");
var fs = require("fs");
const multer = require("multer");

// vendor registration code
vendorRoute.route('/register').post( (req,res)=>{
    var vendor = new Vendor(req.body);
    vendor.save().then( vendor=>{
        if(vendor!=null){
            res.send("Registratin Successful !!");
            res.end();
        } else{
            res.send("Registration Failed..")
            res.end();
        }
    }).catch( (err)=>{
        res.status(400).send("Registration Failed..");
    });
});

// login
vendorRoute.route('/login').post((req, res) => {
    var id = req.body.VUserId;
    var pass = req.body.VUserPass;

    Vendor.findOne({ $and: [{ "VUserId": id }, { "VUserPass": pass }] })
        .then(vendor => {
            if (vendor) {
                res.send(vendor);
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

// get image
// vendorRoute.route('/getimage/:vpicname').get( (req,res)=>{
//     res.sendFile("/Users/Khushi Verma/Documents/Project E-commerce/backend/server-app/vendors/vendorimages/" + req.params.vpicname);
// });
vendorRoute.route('/getimage/:vpicname').get((req, res) => {
    const imagePath = "/Users/Khushi Verma/Documents/Project E-commerce/backend/server-app/vendors/vendorimages/" + req.params.vpicname;
    res.sendFile(imagePath, (err) => {
        if (err) {
            res.status(404).send("Image not found");
        }
    });
});

// image save
const st = multer.diskStorage({
    destination : (req, file, cb)=>{
        cb(null, "/Users/Khushi Verma/Documents/Project E-commerce/backend/server-app/vendors/vendorimages/")
    },
    filename : (req, file, cb)=>{
        cb(null, file.originalname)
    },
});
const upload = multer({storage:st});
// vendorRoute.route('/savevendorimage', upload.single('file'), (req, res)=>{
//     res.json({});
// });
vendorRoute.route('/savevendorimage').post(upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    res.json({ message: 'File uploaded successfully!' });
    // alert("File uploaded successfully!")
    res.send("File uploaded successfully!");
});

// get vendor for count
vendorRoute.route('/getvendorcount').get( (req,res)=>{
    Vendor.find().then( vendor=>{
        res.send(vendor);
        res.end();
    }).catch( err=>{
        res.send("Something went wrong..");
        res.end();
    });
});

// enable|disable vendor by admin
vendorRoute.route('/vendormanage/:vid/:status').put( (req, res)=>{
    Vendor.updateOne({"Vid":req.params.vid}, {"Status":req.params.status}).then( vendor=>{
        res.send("Vendor Status Updated Successfully.");
        res.end();
    }).catch( err=>{
        res.send(err);
        res.end();
    });
});

// // get customer details by id
// customerRoute.route('/getcustomerdetails/:cid').get( (req, res)=>{
//     var id = req.params.cid;
//     Customer.findOne({"Cid":id}).then( customer=>{
//         console.log(customer);
//         res.send(customer);
//         res.end();
//     }).catch( err=>{
//         res.send("Something went wrong..");
//         res.end();
//     });
// });

// // get customer list
// customerRoute.route('/getcustomerlist').get( (req, res)=>{
//     var id = req.params.cid;
//     Customer.find().then( customer=>{
//         console.log(customer);
//         res.send(customer);
//         res.end();
//     }).catch( err=>{
//         res.send("Something went wrong..");
//         res.end();
//     });
// });

module.exports = vendorRoute;