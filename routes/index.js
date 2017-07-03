const express = require("express");
const router = express.Router();

const config = require("../config.json");
const stripe = require("stripe")(config["keys"]["stripe"]["secret"]);

router.get("/", (req, res) => {
    res.render("index");
});

router.post("/submit", (req, res) => {
    const body = req.body;

    const donationAmount = body["donation-amount"];
    const token = body["stripeToken"];

    let charge = stripe.charges.create({
        amount: donationAmount,
        currency: "aud",
        description: "test charge",
        source: token
    }, (err, charge) => {

    });
});

module.exports = router;