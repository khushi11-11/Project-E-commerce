//express mongodb ka connection
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var cors = require('cors');
var bodyparser = require('body-parser');
var PORT = 9122;

//baaki files ka connection (database, route, model via route)
const config = require("./DB");
const productcatgRoute = require("./products/productcatg.route");
const productRoute = require("./products/product.route");
const stateRoute = require('./statecity/state.route');
const cityRoute = require('./statecity/city.route');
const vendorRoute = require('./vendors/vendor.route');
const customerRoute = require("./customers/customer.route");
const billRoute = require("./bills/bill.route");
const paymentdetailsRoute = require("./bills/paymentdetails.route");
const paymentRoute = require("./payment");

app.use(express.json());
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

//files|modules
app.use("/productcatg", productcatgRoute);
app.use("/product", productRoute);
app.use("/state", stateRoute);
app.use("/city", cityRoute);
app.use("/vendor", vendorRoute);
app.use("/customer", customerRoute);
app.use("/bill", billRoute);
app.use("/paymentdetails", paymentdetailsRoute);
app.use('/payment', paymentRoute);

//setting up database connection
mongoose.connect(config.URL, {useNewUrlParser:true}).then( ()=>{
    console.log("Database connected.." + config.URL);
}, err=>{
    console.log("Cannot connect to the database " + err);
})

//for server-side browser
app.get("/", (req, res)=>{
    res.send("server is running");
    res.end();
})

//for the port
app.listen(PORT, ()=>{
    console.log("Server is Running on Port " + PORT);
})