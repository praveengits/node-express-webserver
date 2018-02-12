const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
hbs.registerPartials(__dirname+'/views/partials');

app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    console.log(`${now} : ${req.method} ${req.url}`);
    var log = `${now} : ${req.method} ${req.url}`;
    fs.appendFile('api-log.txt', log+'\n', (err) => {
        if(err) {
            console.log('unable to append to the log');
            
        }
    });
    next();
});

// app.use((req, res, next) => {
//    res.render('maintenance.hbs');
// });

app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear',() => {
    return new Date().getFullYear();
});

hbs.registerHelper('screaner', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        welcomeMsg: 'Welcome to my epress page',
        pageTitle: 'Home Page'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        status_code: 400,
        message: 'this is a bad request'
    });
});

app.listen(3000, () => {
    console.log('App listening on port 3000!');
});