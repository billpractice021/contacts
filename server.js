var express = require("express"),
    app     = express('./api'), 
    app     = express(); 
    
app
    .use(express.static('./public'))
    .use('/api', api)
    .listen(process.env.PORT);
    
