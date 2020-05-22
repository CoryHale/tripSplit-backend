const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/userModel');

router.post('/register', async (req, res) => {
    const user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash

    try {
        await Users.addUser(user);
        res.status(201).json({ message: 'New User Registered', user: user });
    } 
    catch (error) {
        res.status(500).json({ message: 'Could Not Register User', error: error });
    }
})

router.post('/login', async (req, res) => {
    let { phone_number, password } = req.body;

    try {
        const user = await Users.findBy({ phone_number });

        if(user && bcrypt.compareSync(password, user.password)) {
            const token = genToken(user);
            const { id, phone_number } = user;
            
            res.status(200).json({
                message: `Welcome ${user.name}!`,
                token,
                id,
                phone_number
            });
        } else {
            res.status(401).json({ message: 'Invalid Credentials' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error logging in user', error: error });
    }
})

const genToken = user => {
    const payload = {
        subject: 'user',
        id: user.id,
        name: user.name,
        phone_number: user.phone_number
    };

    const secret = process.env.JWT_SECRET;

    const options = {
        expiresIn: '1h'
    };

    return jwt.sign(payload, secret, options);
}

module.exports = router;