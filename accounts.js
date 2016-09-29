var express = require('express'),
    bodyParser = require('body-parser'),
    session    = require('express-session'),
    Bourne     = require('bourne'),
    crypto     = require('crypto');
var chance     = require('chance')();

var router = express.Router(),
    db     = new Bourne('users.json');

function hash (password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

router
    .use(bodyParser.urlencoded({
        extended: true
    }))
    .use(bodyParser.json())
    .use(session({
        secret: 'adshlqr3kqwefsadjklqrwefdsbzcjxcq4rewfadshj',
        resave: true,
        saveUninitialized: true
    }))
    .get('/login', function (req, res) {
        res.sendFile('public/login.html', {"root": "."});
    })
    .post('/login', function (req, res) {
        var user = {
            username: req.body.username,
            password: req.body.password
        };
        console.log(user); 
        db.findOne(user, function (err, data) {
            console.log(err); 
            console.log(data); 
            if (data) {
                req.session.userId = data._id;
                res.redirect('/');
            } else {
                res.redirect('/login');
            }
        });
    })
    .post('/register', function (req, res) {
        var user = {
            username: req.body.username,
            password: req.body.password,
            options: {}, 
            _id: chance.guid()
        };

        db.find({ username: user.username }, function (err, data) {
            if (!data.length) {
                db.insert(user, function (err, data) {
                    req.session.userId = data._id;
                    res.redirect('/');
                });
            } else {
                res.redirect('/login');
            }
        });
            
    })
    .get('/logout', function (req, res) {
        req.session.userId = null;
        res.redirect('/');
    })
    .use(function (req, res, next) {
        if (req.session.userId) {
            db.findOne({ _id: req.session.userId }, function (err, data) {
                req.user = data;
            });
        }
        next();
    })
    .get('/options/displayed_fields', function (req, res) {
        if (!req.user) {
            res.json([]);
        } else {
            res.json(req.user.options.displayed_fields || []);
        }
    })
    .post('/options/displayed_fields', function (req, res) {
        req.user.options.displayed_fields = req.body.fields;   
        db.update({ id: req.user.id }, req.user, function (err, data) {
            res.json(data[0].options.displayed_fields);
        });
    });
    
    
module.exports = router;