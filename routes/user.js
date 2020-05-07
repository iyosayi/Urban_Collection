const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
//model
const User = require ('../models/User');


router.get('/', (req, res) => {
    res.render('users/register');
}); 
router.get('/login', (req, res) => {
    res.render('users/login');
});
router.get('/register',(req, res) => {
    res.render('users/register');
    
});

router.post('/register', (req,res)=>{
    const name = req.body.name;
    const username = req.body.username;
    const email = req.body.email;
    const phone = req.body.phone;
    const password = req.body.password;
    const password2 = req.body.password2

   const errors = [];

     //check required fields
    if (!name || !username || !email || !phone || !password || !password2){
        errors.push({msg: 'All fields are required'});
    }

    //check passwords match
    if(password !==password2){
      errors.push({msg: 'passwords do not match'});  
    }
    if (errors.length > 0) {
        res.render('users/register',{
            errors,
            name,
            username,
            email,
            phone,
            password,
            password2
        });
    }
    else{
        res.redirect('/users/login');
    }
    
});
module.exports = router;