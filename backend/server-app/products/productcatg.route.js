var express = require('express');
var productcatgRoute = express.Router();
var ProductCatg = require("./productcatg.model"); //to accesss the database

productcatgRoute.route('/').get((req, res) => {
    ProductCatg.find().then(productcatg => {
        res.send(productcatg);
        res.end();
    }).catch(err => {
        res.send("Data not Found Something Went Wrong");
        res.end();
    });    
})

//adding product category in the database
productcatgRoute.route("/addproductcatg/:pcatgid/:pcatgname").post( (req, res)=>{
    var productcatg = new ProductCatg({
        pcatgid : req.params.pcatgid,
        pcatgname : req.params.pcatgname
    }); //object creation of the model

    productcatg.save().then(productcatg=>{
        res.send("data stored ..");
        res.end();
    }).catch((err)=>{
        res.send(err);
        res.end();
    });
});

// productcatgRoute.route("/addproductcatg").post( (req, res)=>{
//     var productcatg = new ProductCatg({
//         pcatgid : req.body.pcatgid,
//         pcatgname : req.body.pcatgname
//     }); //object creation of the model

//     productcatg.save().then(productcatg=>{
//         res.send("data stored ..");
//         res.end();
//     }).catch((err)=>{
//         res.send(err);
//         res.end();
//     });
// });

//get all product category from DB - useEffect()
productcatgRoute.route('/showproductcatg').get((req, res) => {
    ProductCatg.find().then(productcatg => {
        res.send(productcatg);
        res.end();
    }).catch(err => {
        res.send("Data not Found Something Went Wrong");
        res.end();
    });    
}); //ni chlra

//search product category in DB
productcatgRoute.route("/searchproductcatg/:pcatgid").get((req, res) => {
    ProductCatg.findOne({ "pcatgid": req.params.pcatgid }).then(productcatg => {
            if (productcatg) {
                res.send(productcatg);
            } else {
                res.send("No such Product Category found.");
            }
        }).catch((err) => {
            res.send("Error occurred: " + err);
        });
});
// productcatgRoute.route("/searchproductcatg/:pcatgid").get((req,res)=>{
//     var productcatg = new ProductCatg(req.body);
//     ProductCatg.findOne({"pcatgid":productcatg.pcatgid}).then(productcatg=>{
//         res.send(productcatg);
//         res.end();
//     }).catch( (err)=>{
//         res.send("Data does not exist." + err);
//         res.end();
//     })
// }); //ni chlra

//update product category in DB
productcatgRoute.route("/editproductcatg/").put( (req,res)=>{
    var productcatg = new ProductCatg(req.body);
    ProductCatg.findOne({"pcatgid":productcatg.pcatgid}, {"pcatgname":productcatg.pcatgname}).then( productcatg=>{
        ProductCatg.updateOne({"pcatgid":req.body.pcatgid}, {"pcatgname":req.body.pcatgname}).then(productcatg=>{
            res.send("Product Category Updated Successfully..");
            res.end();
        }).catch( (err)=>{
            res.send(err);
            res.end()
        });
    }).catch((err)=>{
        res.send("No such Product Category found !!");
        res.end();
    })
});

//delete product category in DB
productcatgRoute.route("/deleteproductcatg/:pcatgid").delete( (req,res)=>{
    ProductCatg.deleteOne({"pcatgid":req.params.pcatgid}).then(productcatg=>{
        if(productcatg.deletedCount>0){
            res.send("Product Category Deleted Successfully ..");
            res.end();
        } else{
            res.send("No such product category found... No data has been deleted !");
            res.end();
        }
    })
});

module.exports=productcatgRoute