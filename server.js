var express = require("express"),
    api     = require('./api'), 
    app     = express(); 
    
app
    .use(express.static('./public'))
    .use('/api', api)
    .listen(process.env.PORT);
    
