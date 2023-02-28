const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

//User schema
const Contacts = require("../models/contacts");

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
router.use(bodyParser.json())

//Create a new Contact || Test Case 1 || Test Case 7 
router.post('/', async (req, res) => {

    let fname = req.body.firstName;
    let lname = req.body.lastName;
    let email = req.body.email;
    let phone = req.body.phone;

    let missingRequired = [];
    if (!fname) missingRequired.push("firstName")
    if (!lname) missingRequired.push("lastName")
    if (!email) missingRequired.push("email")
    if (!phone) missingRequired.push("phone")

    try {
        const Contact = await Contacts.create({ firstName: fname, lastName: lname, email: email, phone: phone });
        res.status(201).json(Contact)
    }
    catch {
        res.status(404).json({ "error": `Missing required field(s): ${missingRequired}` })
    }
})

// List all contacts || Test Case 2
router.get('/', async (req, res) => {
    try {
        const Contact = await Contacts.find({});
        res.status(200).json(Contact)
    }
    catch {
        res.status(404).json({ "error": "Something went worng" })
    }
})

// Get a specific contact  || Test Case 3
router.get('/:id', async (req, res) => {
    try {
        const Contact = await Contacts.find({ _id: req.params.id });
        res.status(200).json(Contact)
    }
    catch {
        res.status(404).json({ "error": "There is no contact with that id" })
    }
})

//Delete a specific contact || Test Case 4
router.delete('/:id', async (req, res) => {
    try {
        const Contact = await Contacts.deleteOne({ _id: req.params.id });
        res.status(204)
        res.end();
    }
    catch {
        res.status(404).json({ "error": "Something went worng" })
    }
})

// Update a specific contact || Test Case 5
router.put('/:id', async (req, res) => {
    try {
        const Contact = await Contacts.updateOne({ _id: req.params.id }, { firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, phone: req.body.phone });
        res.status(204);
        res.end();
    }
    catch {
        res.status(404).json({ "error": "There is no contact with that id" })
    }
})

//Update a specific contact with partial data  || Test Case 6
router.patch('/:id', async (req, res) => {
    try {
        await Contacts.findByIdAndUpdate({ _id: req.params.id }, { firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, phone: req.body.phone });
        res.status(204)
        res.end();
    }
    catch {
        res.status(404).json({ "error": "There is no contact with that id" })
    }
})


module.exports = router;