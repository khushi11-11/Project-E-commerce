// const express = require('express');
// const path = require('path');
// const multer = require('multer');
// const productRoute = express.Router();
// let Product = require('./product.model');

// // Save product
// productRoute.route("/saveproduct").post((req, res) => {
//     let product = new Product(req.body);
//     console.log(product);
//     product.save()
//         .then(product => {
//             res.send('Product Added Successfully !!');
//         })
//         .catch(err => {
//             res.status(500).send("Error saving product: " + err.message);
//         });
// });

// // Get all products
// productRoute.route('/showproduct').get((req, res) => {
//     Product.find()
//         .then(products => {
//             if (products.length === 0) {
//                 return res.status(404).send("No products found.");
//             }
//             res.send(products);
//         })
//         .catch(err => {
//             res.status(500).send("Error retrieving products: " + err.message);
//         });
// });

// // Get product count for ID
// productRoute.route('/getmaxpid').get((req, res) => {
//     Product.find()
//         .then(product => {
//             res.send(product);
//         })
//         .catch(err => {
//             res.status(500).send("Data Not Found.. Something Went Wrong!");
//         });
// });

// // Save product image using multer
// const stv = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, path.join(__dirname, 'products/productimages/'));
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.originalname);
//     },
// });
// const uploadv = multer({ storage: stv });

// // Corrected route for saving product image
// productRoute.post('/saveproductimage', uploadv.single('file'), (req, res) => {
//     if (!req.file) {
//         return res.status(400).send('No file uploaded.');
//     }
//     res.send("File Uploaded Successfully.");
// });

// // Serve product image
// productRoute.route('/getproductimage/:ppicname').get((req, res) => {
//     const imagePath = path.join(__dirname, 'products/productimgs/', req.params.ppicname);

//     res.sendFile(imagePath, (err) => {
//         if (err) {
//             res.status(404).send('Image not found.');
//         }
//     });
// });

// // Get products by vendor ID
// productRoute.route('/showproductbyvendor/:vid').get((req, res) => {
//     Product.find({ "vid": req.params.vid })
//         .then(product => {
//             res.send(product);
//         })
//         .catch(err => {
//             res.status(500).send("Error retrieving vendor's products: " + err.message);
//         });
// });

// // Get products by category ID
// productRoute.route('/showproductbycatgid/:pcatgid').get((req, res) => {
//     Product.find({ "pcatgid": req.params.pcatgid })
//         .then(product => {
//             res.send(product);
//         })
//         .catch(err => {
//             res.status(500).send("Error retrieving products by category: " + err.message);
//         });
// });

// module.exports = productRoute;

const express = require('express');
const productRoute = express.Router();
let Product = require('./product.model');
const multer = require('multer');

//save product
productRoute.route("/saveproduct").post( (req,res)=>{
    let product = new Product(req.body);
    console.log(product);
    product.save().then( product=>{
        res.send('Product Added Successfully !!');
        res.end();
    }).catch( err=>{
        res.send(err);
        res.end();
    });
});

//get all products | display
productRoute.route('/showproduct').get( function(req,res){
    Product.find().then( product=>{
        console.log(product);
        res.send(product);
        res.end();
    }).catch( err=>{
        res.status(400).send("Data Not Found.. Something Went Wrong!");
    });
});

//get product count for id
productRoute.route('/getmaxpid').get( function(req,res){
    Product.find().then( product=>{
        console.log(product);
        res.send(product);
        res.end();
    }).catch( err=>{
        res.status(400).send("Data Not Found.. Something Went Wrong!");
    });
});

// Get image route
productRoute.route('/getimage/:ppicname').get((req, res) => {
    const imagePath = "/Users/Khushi Verma/Documents/Project E-commerce/backend/server-app/products/productimages/" + req.params.ppicname;
    res.sendFile(imagePath, (err) => {
        if (err) {
            res.status(404).send("Image not found");
        }
    });
});
//save product image
productRoute.route('/getproductimage/:ppicname').get((req, res) => {
    const imagePath = "/Users/Khushi Verma/Documents/Project E-commerce/backend/server-app/products/productimages/" + req.params.ppicname;
    res.sendFile(imagePath, (err) => {
        console.log(imagePath)
        if (err) {
            res.status(404).send("Image not found");
        }
    });
});

// Image save route
const st = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "/Users/Khushi Verma/Documents/Project E-commerce/backend/server-app/products/productimages/");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage: st });
productRoute.route('/saveproductimage').post(upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    res.json({ message: 'File uploaded successfully!' });
    alert("File uploaded successfully!")
    
});
// const stv = multer.diskStorage({
//     destination : (req, file, cb)=>{
//         cb(null, "/Users/Khushi Verma/Documents/Project E-commerce/backend/server-app/products/productimages/")
//     },
//     filename : (req, file, cb)=>{
//         cb(null, file.originalname)
//     },
// });
// const uploadv = multer({storage:stv});
// productRoute.post('/saveproductimage', uploadv.single('file')), (req,res)=>{
//     res.send("File Uploaded Successfully..");
//     res.end();
// };

// //get product image
// productRoute.route('/getproductimage/:ppicname').get( (req,res)=>{ //picname -> ppicname
//     res.sendFile("/Users/Khushi Verma/Documents/Project E-commerce/backend/server-app/products/productimages/" + req.params.ppicname);
// });

//get product by vendor id
productRoute.route('/showproductbyvendor/:vid').get( function(req,res){
    Product.find({"vid":req.params.vid}).then( product=>{
        console.log(product);
        res.send(product);
        res.end();
    }).catch( err=>{
        res.status(400).send("Data Not Found.. Something Went Wrong!");
    });
});

//get product by category id
productRoute.route('/showproductbycatgid/:pcatgid').get( function(req,res){
    Product.find({"pcatgid":req.params.pcatgid}).then( product=>{
        console.log(product);
        res.send(product);
        res.end();
    }).catch( err=>{
        res.status(400).send("Data Not Found.. Something Went Wrong!");
    });
});

module.exports = productRoute;