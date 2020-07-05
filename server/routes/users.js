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
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const Business = require('../models/business');
const express = require('express')
const userRouter = express.Router()
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

userRouter.get('/', (req, res) => {
    res.send({
        status: 200,
        message: 'User Route root.'
    });
})

userRouter.get('/token', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            branch: user.branch
        }));
});

userRouter.post('/login', (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
        if (user === null) return res.status(400).json({ message: 'Email not found. Do you have an account?' });
        bcrypt.compare(password, user.password, (err, success) => {
            if (err || success === false) {
                return res.status(401).json({
                    message: 'Password Invalid. Please try again.'
                });
            }
            jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 1800 }, (err, token) => {
                if (err) throw err;
                res.status(200).json({
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
    })
});

userRouter.delete('/:id', auth, (req, res) => {
    const id = req.params.id;
    Business.find({ ownerId: id }, (err, docs) => {
        if (docs.length > 0) {
            docs.forEach(doc => {
                Business.findByIdAndDelete(doc._id, (err, mongores) => {
                    if (err) {
                        res.status(500).json({
                            message: err.message,
                        });
                        return;
                    }
                });
            })
        }
        User.findByIdAndDelete(id, (err, mongores) => {
            if (err) {
                res.status(500).json({
                    message: err.message,
                });
                return;
            }
            res.status(200).json({
                message: mongores
            });
        });
    })
});


userRouter.post('/passwordchange', auth, (req, res) => {
    const { email, password, newPassword } = req.body;
    User.findOne({ email }, (err, user) => {
        if (err) throw err;
        bcrypt.compare(password, user.password, (err, success) => {
            if (err || success === false) {
                return res.status(401).json({
                    message: 'Current Password does not match. Please try again.'
                })
            }
            bcrypt.genSalt(10).then(salt => {
                bcrypt.hash(newPassword, salt, (err, hash) => {
                    user.password = hash;
                    user.save().then(res.status(203).json({
                        user: {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            branch: user.branch
                        }, msg: 'Password successfully updated.'
                    }))
                });
            })
        });
    });
});

userRouter.post('/register', (req, res) => {
    const  passwordValidation = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[\]:;<>,.?~_+-=|]).{8,32}$/gm;
    const { email, password, confPassword, branch, name } = req.body;
    if (!email || !password || !confPassword || !branch || !name) {
        return res.status(400).json({
            message: 'All Fields Required.'
        });
    }
    if(passwordValidation.test(password) === false) {
        return res.status(400).json({
            message: 'Passwords does not meet minimum security requirements. Password must include 1 Special Character, 1 Uppercase Letter, 1 Lowercase Letter, and minimum of 8 characters.'
        });
    }
    if (password !== confPassword) {
        return res.status(400).json({
            message: 'Passwords do not match.'
        });
    }
    User.findOne({ email }).then(user => {
        if (user) {
            return res.status(400).json({
                message: 'Email already in use.'
            });
        }
        const newUser = new User({
            email,
            branch,
            name,
            password
        });
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser.save().then(user => {
                    jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 1800 }, (err, token) => {
                        if (err) throw err;
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