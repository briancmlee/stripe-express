const express = require("express");
const router = express.Router();

const config = require("../config.json");
const stripe = require("stripe")(config["keys"]["stripe"]["secret"]);

router.get("/", (req, res) => {
    res.render("index");
});

router.post("/submit", (req, res) => {
    const body = req.body;

    const donationAmount = parseFloat(body["donation-amount"]);
    const token = body["stripeToken"];

    let charge = stripe.charges.create({
        amount: parseInt(donationAmount * 100),
        currency: "aud",
        description: "test charge",
        source: token
    }, (err, charge) => {

    });

    res.render("submit", { donationAmount : donationAmount })
});

module.exports = router;