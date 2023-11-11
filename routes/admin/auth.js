const express = require('express');
const {handleErrors} = require('./middlewares');
const usersRepo = require('../../repositories/users');
const signupTemplate = require('../../views/admin/auth/signup');
const signinTemplate = require('../../views/admin/auth/signin')
const {requireEmail,requirePassword, requirePasswordConfirmation, requireEmailExists, requireValidPasswordForUser} = require('./validators');

const router = express.Router(); //router object sameas app obj, just diff is we can linkit back up to our app inside in index.js

router.get('/signup', (req,res)=>{  // route handler -.tell web server what it should do when it receives network http request | req- an object that represent incoming request from a browser into the web server
    res.send(signupTemplate({req}));
});

router.post('/signup', [
        requireEmail,
        requirePassword,
        requirePasswordConfirmation
        ], 
        handleErrors(signupTemplate),
        async(req,res)=>{

            const {email, password} = req.body;

        
            const user = await usersRepo.create({email, password});

            req.session.userId = user.id;

            res.redirect('/admin/products');
});


router.get('/signout', (req,res)=>{
    req.session = null;
    res.send("You are logged out");
});

router.get('/signin', (req,res)=>{
    res.send(signinTemplate({}));
});

router.post('/signin', [
        requireEmailExists,
        requireValidPasswordForUser
        ],
    
        handleErrors(signinTemplate),
        async(req,res)=>{
            const {email} = req.body;

            const user = await usersRepo.getOneBy({email});
            req.session.userId = user.id;
            res.redirect('/admin/products');
});

module.exports = router; //so  we can make all diff handlers available to other files