const express = require('express');
const stateRoute = express.Router();
const State = require("./state.model");

//save state
stateRoute.route("/save").post( (req,res)=>{
    let state = new State(req.body);
    state.save().then( state=>{
        res.send("State saved..");
        res.end();
    }).catch( err=>{
        res.send("Unable to save data into the database..");
        res.end();
    });
});

//search
stateRoute.route("/searchstate/:stid").get((req, res) => {
    State.findOne({ "stid": req.params.stid }).then(state => {
            if (state) {
                res.send(state);
            } else {
                res.send("No such State found.");
            }
        }).catch((err) => {
            res.send("Error occurred: " + err);
        });
});

//update
stateRoute.route("/editstate/").put( (req,res)=>{
    var state = new State(req.body);
    State.findOne({"stid":state.stid}, {"stname":state.stname}).then( state=>{
        State.updateOne({"stid":req.body.stid}, {"stname":req.body.stname}).then( state=>{
            res.send("State Updated Successfully..");
            res.end();
        }).catch( (err)=>{
            res.send(err);
            res.end()
        });
    }).catch((err)=>{
        res.send("No such State found !!");
        res.end();
    })
});

//delete
stateRoute.route("/deletestate/:stid").delete( (req,res)=>{
    State.deleteOne({"stid":req.params.stid}).then(state=>{
        if(state.deletedCount>0){
            res.send("State Deleted Successfully ..");
            res.end();
        } else{
            res.send("No such state found... No data has been deleted !");
            res.end();
        }
    })
})

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

module.exports = stateRoute;