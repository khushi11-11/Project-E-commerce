require("dotenv").config();
const express = require('express');
const Razorpay = require("razorpay");
const router = express.Router();

// router.post("/orders/:amt", async (req, res) => {
//     try{
//         const instance = new Razorpay({
//             key_id : process.env.RAZORPAY_KEY_ID,
//             key_secret : process.env.RAZORPAY_KEY_SECRET
//         });
//         const options = {
//             amount : req.params.amt,
//             currency : "INR",
//             receipt : "receipt_order_74394"
//         };
//         const order = await instance.orders.create(options);
//         if (!order) {
//             return res.status(500).send("Some Error Occured..");
//         }
//         res.json(order);
//     } catch (error) {
//         res.status(500).send(error);
//     };
// });
router.post("/orders/:amt", async (req, res) => {
    console.log("Amount="+req.params.amt)
    try {
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID ,
            key_secret: process.env.RAZORPAY_SECRET
        });

        // const amountInPaise = req.params.amt * 100; // Convert to paise
        const options = {
            // amount: amountInPaise,
            amount : req.params.amt,
            currency: "INR",
            receipt: "receipt_order_74394"
        };

        const order = await instance.orders.create(options);
        
        if (!order) {
            console.error("Order creation failed:", order); // Log response if order is undefined
            return res.status(500).send("Error: Unable to create order.");
        }

        res.json(order);  // Return the Razorpay order object
    } catch (error) {
        console.error("Error creating Razorpay order:", error.message, error.stack); // Log detailed error message
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});


// success page 
router.post('/success', async (req, res) => {
    //transaction details
    res.send("Payment Successfully Done !");
    res.end();
});

module.exports = router;