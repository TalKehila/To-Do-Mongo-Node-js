//user.js file  (not model) ./routes/user.js (Server side)
const express = require('express');
const bcrypt = require('bcryptjs');
const tokenservice = require('../services/token');
const User = require('../model/Users');

const router = express.Router();
const secret = tokenservice.secret;

const jwt = require('jsonwebtoken');
router.get('/',async (req,res) => {
    let users = await User.find();
    res.send(users);
    res.end();
})

router.post('/login', async (req, res) => {
    try {
        let user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(404).send("Incorrect username or password");
        }

        let passwordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!passwordMatch) {
            return res.status(401).send("Incorrect password");
        }

        let validuntil = new Date();
        validuntil.setDate(validuntil.getDate() + 14);
        const token = jwt.sign({
            _id: user._id,
            username: user.username,
            validuntil: validuntil
        }, secret);

        res.send({
            token: token,
            username: user.username,
            email: user.email,
            fullname: user.fullname
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/signup', async (req, res) => {
    
        let password = req.body.password;
        let hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email,
            fullname: req.body.fullname
        });
    try {
        await user.save();
        res.send(user);
        res.end();
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
        res.end();
    }
});
module.exports = router;