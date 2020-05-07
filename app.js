const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require ('path');
const expressLayouts = require('express-ejs-layouts');  
require("dotenv/config");

mongoose.connect(process.env.DB_CONNECT, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    (error) => {
        if (!error) {
            console.log('connected to database');
        } else {
            console.log(`error connecting to the db!!!! ${error}`);
        }
    });

//express body-parser 
app.use(express.json());
app.use(express.urlencoded({extended: false}));


//set up path to views

app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
 app.set('view engine', 'ejs');
 
 //set up public folder
app.use(express.static(path.join(__dirname, 'public')));


//import routes
const usersRoute = require('./routes/user');
const welcomeRoute = require('./routes/welcome');



app.use('/users', usersRoute);
app.use('/', welcomeRoute);

app.get('/dashboard', (req, res) => {
    res.render('./dashboard');
});


//listen to a server
const port = process.env.PORT || 3000;
app.listen(port, console.log(`Server started on port ${port}....`));