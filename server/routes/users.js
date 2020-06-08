/* eslint-disable no-plusplus */
/* eslint-disable id-length */
/* eslint-disable capitalized-comments */
/* eslint-disable max-len */
/* eslint-disable no-magic-numbers */
/* eslint-disable no-undef */
/* eslint-disable prefer-const */
/* eslint-disable init-declarations */
/* eslint-disable no-implicit-globals */
/* eslint-disable max-statements */
/* eslint-disable new-cap */
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const express = require('express')
const userRouter = express.Router()
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

userRouter.get('/', (req, res) => {
    res.send({
        status: 200,
        message: 'User Route root.'
    });
})

userRouter.post('/register', (req, res) => {
    const  passwordValidation = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[\]:;<>,.?~_+-=|]).{15,32}$/gm;
    const {email, password, confPassword, branch, name} = req.body;

    console

    if(passwordValidation.test(password) === false) {
        return res.status(400).json({
            message: 'Passwords does not meet minimum security requirements.'
        });
    }

    if(password !== confPassword ) {
        return res.status(400).json({
            message: 'Passwords do not match.'
        });
    }

    if(!email || !password || !confPassword || !branch || !name ) {
        return res.status(400).json({
            message: 'All Fields Required.'
        });
    }

    User.findOne({email}).then(user => {
        if(user) {
            return res.status(400).json({
                message: 'Email already in use.'
            });
        }
        const newUser = new User({
            email,
            branch,
            name,
            password
        })

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt,(err, hash) => {
                if(err) throw err;
                newUser.password = hash;
                newUser.save().then(user => {
                    jwt.sign({id: user.id}, process.env.JWT_SECRET, { expiresIn: 1800 }, (err, token) => {
                        if(err) throw err;
                        res.status(201).json({
                            user: {
                                id: user.id,
                                name: user.name,
                                email: user.email,
                                branch: user.branch
                            },
                            token
                        })
                    });
                });
            });
        });
    });
});


module.exports = userRouter;