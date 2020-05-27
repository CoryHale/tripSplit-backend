const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const Trips = require('./tripModel');

// POST trip
router.post('/', async (req, res) => {
    const tripData = req.body;

    try {
        await Trips.addTrip(tripData);
        res.status(201).json({ message: 'Added trip!' });
    }
    catch (err) {
        res.status(500).json({ message: 'Trip could not be added', error: err });
    }
})

// UPDATE trip
router.put('/:id', validateUser, async (req, res) => {
    const tripData = req.body;
    const { id } = req.params;

    try {
        const updatedData = await Trips.updateTrip(id, tripData);
        res.status(201).json(updatedData);
    }
    catch (err) {
        res.status(500).json({ message: 'Trip could not be updated', error: err });
    }
})

// DELETE trip
router.delete('/:id', validateUser, async (req, res) => {
    const { id } = req.params;

    try {
        const deletedTrip = await Trips.deleteTrip(id);

        if(deletedTrip) {
            res.status(201).json(deletedTrip)
        }
        else {
            res.status(404).json({ message: 'Could not delete trip' });

        }
    }
    catch (err) {
        res.status(500).json({ message: 'Could not delete trip', error: err });
    }
})

// GET all trips
router.get('/', validateUser, async (req, res) => {
    try {
        const trips = await Trips.find();
        res.status(200).json(trips);
    }
    catch (err) {
        res.status(500).json({ message: 'Could not find trips', error: err });
    }
})

// GET trip by id
router.get('/:id', validateUser, async (req, res) => {
    const { id } = req.params;

    try {
        const selectedTrip = await Trips.findTrip(id);

        if(selectedTrip) {
            res.json(selectedTrip);
        }
        else {
            res.status(404).json({ message: 'Could not find trip' });
        }
    }
    catch (err) {
        res.status(500).json({ message: 'Could not find trip', error: err });
    }
})

// GET trips by primary id
router.get('/:id/trips', validateUser, async (req, res) => {
    const { id } = req.params;

    try {
        const selectedTrips = await Trips.filterByPrimary(id);

        if(selectedTrips) {
            res.json(selectedTrips);
        }
        else {
            res.status(404).json({ message: 'Could not find trips' });
        }
    }
    catch (err) {
        res.status(500).json({ message: 'Could not find trips', error: err });
    }
})

// Validate Middleware

function validateUser(req, res, next) {
    const tokenId = jwt.decode(localStorage.getItem('token')).id;
    const { id } = req.params;

    if(tokenId == id) {
        next();
    }
    else {
        res.status(400).json({ message: 'unauthorized user: cannot perform this action' });
    }
}