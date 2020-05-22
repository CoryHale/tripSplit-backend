const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const Users = require('./userModel');

router.post('/', async (req, res) => {
    const userData = req.body;

    try {
        await Users.addUser(userData);
        res.status(201).json({ message: 'Added user!' });
    }
    catch (err) {
        res.status(500).json({ message: 'User could not be added', error: err });
    }
})

router.put('/:id', validateUser, async (req, res) => {
    const userData = req.body;
    const { id } = req.params;

    try {
        const updatedData = await Users.updateUser(id, userData);
        res.status(201).json(updatedData)
    }
    catch (err) {
        res.status(500).json({ message: 'User could not be updated', error: err });
    }
})

router.delete('/:id', validateUser, async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await Users.deleteUser(id);

        if(deletedUser) {
            res.status(201).json(deletedUser);
        }
        else {
            res.status(404).json({ message: 'Could not delete user' });
        }
    }
    catch (err) {
        res.status(500).json({ message: 'Could not delete user', error: err });
    }
})

router.get('/:id', validateUser, async (req, res) => {
    const { id } = req.params;

    try {
        const selectedUser = await Users.getUserById(id);

        if(selectedUser) {
            res.json(selectedUser);
        }
        else {
            res.status(404).json({ message: 'Could not find user' });
        }
    }
    catch (err) {
        res.status(500).json({ message: 'Could not find user', error: err });
    }
})

// Middlewares

