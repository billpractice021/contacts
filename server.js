var express = require("express"),
    api     = require('./api'), 
    users   = require('./accounts'),
    app     = express(); 
    
app
    .use(express.static('./public'))
    .use(users)
    .use('/api', api)
    .use(function(req, res, next) {
        console.log("Hello World"); 
        next(); 
    })
    .use(function (req, res) {
        if (!req.user) {
            res.redirect('/login');
        } else {
            res.sendFile('public/main.html', {"root": "."});
        }
    })
    .listen(process.env.PORT); 
    
