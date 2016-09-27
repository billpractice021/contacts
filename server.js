var express = require("express"),
    api     = require('./api'), 
    users   = require('/accounts'),
    app     = express(); 
    
app
    .use(express.static('./public'))
    .use(users)
    .use('/api', api)
    .listen(process.env.PORT);
    
