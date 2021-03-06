const express = require('express');
const hbs = require('hbs')
var app = express();
const fs = require('fs');
const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view-engine', 'hbs');


app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '/n', (err) => {
        if (err) {
            console.log('Unable to append to server.log');
        }
    });
    next();
});
// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });
app.use(express.static(__dirname + '/public'));

app.get('/project', (req, res) => {
    res.render('project.hbs', {
        pageTitle: 'Best website ever',
        currentYear: new Date().getFullYear(),
    });
});
app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'Best website ever',
        currentYear: new Date().getFullYear(),
    });
});
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Best website ever',
        welcomeMessage: 'welcome',
        currentYear: new Date().getFullYear(),
    });
});
app.listen(port, () => {
    console.log(`server running on port ${port}`);
});