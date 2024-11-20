const express = require('express');
const cityRoute = express.Router();
var City = require("./city.model");
var stateRoute = require("./state.route");


//save city
cityRoute.route("/save").post( (req,res)=>{
    let city = new City(req.body);
    city.save().then( city=>{
        res.send("City saved..");
        res.end();
    }).catch( err=>{
        res.send("Unable to save data into the database..");
        res.end();
    });
});

//search by city id
cityRoute.route("/searchcity/:ctid").get((req, res) => {
    City.findOne({ "ctid": req.params.ctid }).then(city => {
            if (city) {
                res.send(city);
            } else {
                res.send("No such City found.");
            }
        }).catch((err) => {
            res.send("Error occurred: " + err);
        });
});

//get city by state id
cityRoute.route("/getcitybystid/:stid").get( (req,res)=>{
    City.find({"stid":req.params.stid}).then( (city)=>{
        res.send(city);
        res.end();
    }).catch( (err)=>{
        res.send(err);
        res.end();
    });
})

//update
cityRoute.route("/editcity/").put( (req,res)=>{
    var city = new City(req.body);
    City.findOne({"ctid":city.ctid}, {"ctname":city.ctname}).then( city=>{
        City.updateOne({"ctid":req.body.ctid}, {"ctname":req.body.ctname}).then( city=>{
            res.send("City Updated Successfully..");
            res.end();
        }).catch( (err)=>{
            res.send(err);
            res.end()
        });
    }).catch((err)=>{
        res.send("No such City found !!");
        res.end();
    })
});

//delete
cityRoute.route("/deletecity/:ctid").delete( (req,res)=>{
    City.deleteOne({"ctid":req.params.ctid}).then(city=>{
        if(city.deletedCount>0){
            res.send("City Deleted Successfully ..");
            res.end();
        } else{
            res.send("No such city found... No data has been deleted !");
            res.end();
        }
    })
});

//show all cities - useEffect
cityRoute.route("/show").get( (req,res)=>{
    City.find().then( (city)=>{
        res.send(city);
        res.end();
    }).catch( (err)=>{
        res.send(err);
        res.end();
    });
});

//show all states - useEffect
stateRoute.route("/show").get( (req,res)=>{
    State.find().then( (state)=>{
        res.send(state);
        res.end();
    }).catch( (err)=>{
        res.send(err);
        res.end();
    });
});

module.exports = cityRoute;