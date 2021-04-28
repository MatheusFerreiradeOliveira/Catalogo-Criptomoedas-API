const express = require('express');
const Cryptocurrency = require('../models/cryptocurrency');

const router = express.Router();

router.post('/cryptocurrencies', async (req, res) => { 
    try {
        const cryptocurrency = new Cryptocurrency({
            name: req.body.name,
            value: req.body.value,
            isFavourite: req.body.isFavourite,
        })

        await cryptocurrency.save();
        res.status(201).send(cryptocurrency);

    } catch(e) {
        res.status(500).send(e)
    }
});

router.get('/cryptocurrencies', async (req, res) => {
    try {
        const cryptocurrencies = await Cryptocurrency.find();
        res.status(201).send(cryptocurrencies);
    } catch(e) {
        res.status(500).send(e)
    }
});

router.get('/cryptocurrencies/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const cryptocurrency = await Cryptocurrency.findOne({_id: id});
        if(!cryptocurrency) {
            res.status(401).send("Cryptocurrency not found");
        }
        res.status(201).send(cryptocurrency);
    } catch(e) {
        res.status(500).send(e);
    }
});

router.patch('/cryptocurrencies/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let cryptocurrency = await Cryptocurrency.findOne({_id: id});
        if(!cryptocurrency) {
            res.status(400).send("Cryptocurrency not found");
        }

        const updateObj = {
            name: (req.body.name === undefined ? cryptocurrency.name : req.body.name),
            value: (req.body.value === undefined ? cryptocurrency.value : req.body.value),
            isFavourite: (req.body.isFavourite === undefined ? cryptocurrency.isFavourite : req.body.isFavourite),
        }

        await Cryptocurrency.updateOne(
            {
                _id: id
            },
            updateObj
        )

        cryptocurrency = await Cryptocurrency.find({_id: id});

        res.status(201).send(cryptocurrency)

    } catch(e) {
        res.status(500).send(e)
    }
})

router.delete('/cryptocurrencies/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const cryptocurrency = await Cryptocurrency.findOne({_id: id});
        if(!cryptocurrency) {
            res.status(400).send("Cryptocurrency not found");
        }
        await Cryptocurrency.deleteOne({_id: id});
        res.status(201).send("Cryptocurrency deleted");
    } catch(e) {
        res.status(500).send(e);
    }
})

module.exports = router;