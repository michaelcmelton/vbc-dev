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
    .then(user => res.json(user));
});

userRouter.post('/login', (req, res) => {
    const { email, password } = req.body;
    User.findOne({email}, (err, user) => {
        if(err) throw err;
        bcrypt.compare(password, user.password, (err, success) => {
            if(err || success === false) {
                return res.status(401).json({
                    message: 'Password Invalid. Please try again.'
                });
            }
            jwt.sign({id: user.id}, process.env.JWT_SECRET, { expiresIn: 1800 }, (err, token) => {
                if(err) throw err;
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


userRouter.post('/passwordchange', auth, (req, res) => {
    const {email, password, newPassword} = req.body;
    User.findOne({email}, (err, user) => {
        if(err) throw err;
        bcrypt.compare(password, user.password, (err, success) => {
            if(err || success === false) {
                return res.status(401).json({
                    message: 'Current Password does not match. Please try again.'
                })
            }
            bcrypt.genSalt(10).then(salt =>{
                bcrypt.hash(newPassword, salt, (err, hash) => {
                    user.password = hash;
                    user.save().select('-password').then(user => {
                        res.status(203).json({
                            msg:'Password Successfully Updated.',
                            user
                        })
                    });

                })
            })
        });
    })
});

userRouter.post('/register', (req, res) => {
    // const  passwordValidation = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[\]:;<>,.?~_+-=|]).{15,32}$/gm;
    const {email, password, confPassword, branch, name} = req.body;
    if(!email || !password || !confPassword || !branch || !name ) {
        return res.status(400).json({
            message: 'All Fields Required.'
        });
    }
    // if(passwordValidation.test(password) === false) {
    //     return res.status(400).json({
    //         message: 'Passwords does not meet minimum security requirements.'
    //     });
    // }
    if(password !== confPassword ) {
        return res.status(400).json({
            message: 'Passwords do not match.'
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
        });
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